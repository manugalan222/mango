<?php

namespace Tests\Feature;

use App\Models\Perfil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
}
