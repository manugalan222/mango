<?php

namespace Tests\Feature;

use App\Models\Nota;
use App\Models\Perfil;
use App\Models\User;
use App\Services\NotaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotaTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_nota_can_be_created()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $response = $this->actingAs($casa)->post('/notas', [
            'perfil_id' => $perfil->id,
            'titulo' => 'Compras del finde',
            'contenido' => 'No olvidar el detergente.',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/hogar');

        $this->assertDatabaseHas('notas', [
            'perfil_id' => $perfil->id,
            'titulo' => 'Compras del finde',
        ]);
    }

    public function test_creating_a_nota_requires_contenido()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $this->actingAs($casa)->post('/notas', [
            'perfil_id' => $perfil->id,
        ])->assertSessionHasErrors('contenido');
    }

    public function test_a_nota_cannot_be_created_with_a_perfil_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();

        $this->actingAs($casa)->post('/notas', [
            'perfil_id' => $perfilAjeno->id,
            'contenido' => 'Intento ajeno.',
        ])->assertSessionHasErrors('perfil_id');
    }

    public function test_a_nota_can_be_updated_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $nota = Nota::factory()->for($perfil)->create();

        $response = $this->actingAs($casa)->put("/notas/{$nota->id}", [
            'perfil_id' => $perfil->id,
            'contenido' => 'Actualizada.',
            'fijada' => true,
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/hogar');

        $this->assertDatabaseHas('notas', [
            'id' => $nota->id,
            'contenido' => 'Actualizada.',
            'fijada' => true,
        ]);
    }

    public function test_a_nota_cannot_be_updated_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $nota = Nota::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)
            ->put("/notas/{$nota->id}", [
                'perfil_id' => $perfilAjeno->id,
                'contenido' => 'Hackeada.',
            ])
            ->assertForbidden();
    }

    public function test_a_nota_can_be_deleted_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $nota = Nota::factory()->for($perfil)->create();

        $this->actingAs($casa)
            ->delete("/notas/{$nota->id}")
            ->assertRedirect('/hogar');

        $this->assertDatabaseMissing('notas', ['id' => $nota->id]);
    }

    public function test_a_nota_cannot_be_deleted_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $nota = Nota::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)
            ->delete("/notas/{$nota->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('notas', ['id' => $nota->id]);
    }

    public function test_listar_de_casa_orders_pinned_notas_first_then_most_recent()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $vieja = Nota::factory()->for($perfil)->create(['fijada' => false, 'created_at' => now()->subDays(3)]);
        $nueva = Nota::factory()->for($perfil)->create(['fijada' => false, 'created_at' => now()->subDay()]);
        $fijada = Nota::factory()->for($perfil)->create(['fijada' => true, 'created_at' => now()->subDays(5)]);

        $ids = (new NotaService)->listarDeCasa($casa)->pluck('id')->values();

        $this->assertEquals([$fijada->id, $nueva->id, $vieja->id], $ids->all());
    }

    public function test_listar_de_casa_does_not_include_notas_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        Nota::factory()->for($perfilAjeno)->create();

        $notas = (new NotaService)->listarDeCasa($casa);

        $this->assertCount(0, $notas);
    }

    public function test_a_hogar_view_can_be_rendered()
    {
        $casa = User::factory()->create();

        $this->actingAs($casa)->get('/hogar')->assertOk();
    }
}
