<?php

namespace Tests\Feature;

use App\Models\Perfil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PerfilTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/perfiles')->assertRedirect('/login');
    }

    public function test_a_casa_can_list_its_perfiles()
    {
        $casa = User::factory()->create();
        Perfil::factory()->for($casa)->create(['nombre' => 'Manu', 'color' => 'mango']);

        $this->actingAs($casa)
            ->get('/perfiles')
            ->assertOk();
    }

    public function test_a_perfil_can_be_created()
    {
        $casa = User::factory()->create();

        $response = $this->actingAs($casa)->post('/perfiles', [
            'nombre' => 'Manu',
            'color' => 'mango',
            'pin' => '1234',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/perfiles');

        $this->assertDatabaseHas('perfiles', [
            'user_id' => $casa->id,
            'nombre' => 'Manu',
            'color' => 'mango',
        ]);

        $this->assertTrue(Hash::check('1234', $casa->perfiles()->first()->pin));
    }

    public function test_two_perfiles_in_the_same_casa_cannot_share_a_color()
    {
        $casa = User::factory()->create();
        Perfil::factory()->for($casa)->create(['color' => 'mango']);

        $response = $this->actingAs($casa)->post('/perfiles', [
            'nombre' => 'Cande',
            'color' => 'mango',
        ]);

        $response->assertSessionHasErrors('color');
    }

    public function test_two_perfiles_in_the_same_casa_cannot_share_a_name()
    {
        $casa = User::factory()->create();
        Perfil::factory()->for($casa)->create(['nombre' => 'Manu']);

        $response = $this->actingAs($casa)->post('/perfiles', [
            'nombre' => 'Manu',
            'color' => 'verde',
        ]);

        $response->assertSessionHasErrors('nombre');
    }

    public function test_a_perfil_can_be_updated_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['nombre' => 'Manu', 'color' => 'mango']);

        $response = $this->actingAs($casa)->put("/perfiles/{$perfil->id}", [
            'nombre' => 'Manuel',
            'color' => 'verde',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/perfiles');

        $this->assertDatabaseHas('perfiles', [
            'id' => $perfil->id,
            'nombre' => 'Manuel',
            'color' => 'verde',
        ]);
    }

    public function test_a_perfil_cannot_be_updated_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfil = Perfil::factory()->for($otraCasa)->create();

        $this->actingAs($casa)
            ->put("/perfiles/{$perfil->id}", ['nombre' => 'Hackeado', 'color' => 'verde'])
            ->assertForbidden();
    }

    public function test_a_perfil_can_be_deleted_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $this->actingAs($casa)
            ->delete("/perfiles/{$perfil->id}")
            ->assertRedirect('/perfiles');

        $this->assertDatabaseMissing('perfiles', ['id' => $perfil->id]);
    }

    public function test_a_perfil_cannot_be_deleted_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfil = Perfil::factory()->for($otraCasa)->create();

        $this->actingAs($casa)
            ->delete("/perfiles/{$perfil->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('perfiles', ['id' => $perfil->id]);
    }

    public function test_editing_without_a_new_pin_keeps_the_old_one()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['color' => 'mango', 'pin' => '1234']);

        $this->actingAs($casa)->put("/perfiles/{$perfil->id}", [
            'nombre' => 'Manuel',
            'color' => 'mango',
            'pin' => '',
        ])->assertSessionHasNoErrors();

        $this->assertTrue(Hash::check('1234', $perfil->fresh()->pin));
    }

    public function test_editing_can_change_the_pin()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['color' => 'mango', 'pin' => '1234']);

        $this->actingAs($casa)->put("/perfiles/{$perfil->id}", [
            'nombre' => $perfil->nombre,
            'color' => 'mango',
            'pin' => '98765',
        ])->assertSessionHasNoErrors();

        $this->assertTrue(Hash::check('98765', $perfil->fresh()->pin));
    }

    public function test_editing_can_remove_the_pin()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['color' => 'mango', 'pin' => '1234']);

        $this->actingAs($casa)->put("/perfiles/{$perfil->id}", [
            'nombre' => $perfil->nombre,
            'color' => 'mango',
            'quitar_pin' => true,
        ])->assertSessionHasNoErrors();

        $this->assertNull($perfil->fresh()->pin);
    }

    public function test_the_frontend_knows_if_a_perfil_has_a_pin_but_never_sees_it()
    {
        $perfil = Perfil::factory()->create(['pin' => '1234']);

        $json = $perfil->toArray();

        $this->assertTrue($json['tiene_pin']);
        $this->assertArrayNotHasKey('pin', $json);
    }

    public function test_a_perfil_without_pin_can_be_entered()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $this->actingAs($casa)
            ->post("/perfiles/{$perfil->id}/entrar")
            ->assertRedirect('/dashboard')
            ->assertSessionHas('perfil_id', $perfil->id);
    }

    public function test_a_perfil_with_pin_asks_for_it()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['pin' => '1234']);

        $this->actingAs($casa)
            ->post("/perfiles/{$perfil->id}/entrar")
            ->assertSessionHasErrors('pin')
            ->assertSessionMissing('perfil_id');
    }

    public function test_a_wrong_pin_does_not_enter()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['pin' => '1234']);

        $this->actingAs($casa)
            ->post("/perfiles/{$perfil->id}/entrar", ['pin' => '0000'])
            ->assertSessionHasErrors('pin')
            ->assertSessionMissing('perfil_id');
    }

    public function test_the_right_pin_enters()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['pin' => '1234']);

        $this->actingAs($casa)
            ->post("/perfiles/{$perfil->id}/entrar", ['pin' => '1234'])
            ->assertRedirect('/dashboard')
            ->assertSessionHas('perfil_id', $perfil->id);
    }

    public function test_too_many_wrong_pins_lock_the_perfil_for_a_while()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create(['pin' => '1234']);

        $this->actingAs($casa);

        foreach (range(1, 5) as $_) {
            $this->post("/perfiles/{$perfil->id}/entrar", ['pin' => '0000']);
        }

        $this->post("/perfiles/{$perfil->id}/entrar", ['pin' => '1234'])
            ->assertSessionHasErrors('pin')
            ->assertSessionMissing('perfil_id');
    }

    public function test_a_perfil_of_another_casa_cannot_be_entered()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->create();

        $this->actingAs($casa)
            ->post("/perfiles/{$perfil->id}/entrar")
            ->assertForbidden();
    }
}
