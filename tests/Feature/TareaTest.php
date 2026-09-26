<?php

namespace Tests\Feature;

use App\Models\Perfil;
use App\Models\Tarea;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TareaTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_tarea_can_be_created_with_asignados()
    {
        $casa = User::factory()->create();
        $creador = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $asignado = Perfil::factory()->for($casa)->create(['color' => 'verde']);

        $response = $this->actingAs($casa)->post('/tareas', [
            'perfil_id' => $creador->id,
            'titulo' => 'Sacar la basura',
            'asignados' => [$asignado->id],
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/hogar');

        $this->assertDatabaseHas('tareas', ['titulo' => 'Sacar la basura', 'perfil_id' => $creador->id]);
        $tarea = Tarea::first();
        $this->assertTrue($tarea->asignados->contains($asignado));
    }

    public function test_creating_a_tarea_requires_titulo()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $this->actingAs($casa)->post('/tareas', [
            'perfil_id' => $perfil->id,
        ])->assertSessionHasErrors('titulo');
    }

    public function test_a_tarea_cannot_be_created_with_an_asignado_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();

        $this->actingAs($casa)->post('/tareas', [
            'perfil_id' => $perfil->id,
            'titulo' => 'Intento ajeno',
            'asignados' => [$perfilAjeno->id],
        ])->assertSessionHasErrors('asignados.0');
    }

    public function test_a_tarea_can_be_updated_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $tarea = Tarea::factory()->for($perfil)->create();

        $response = $this->actingAs($casa)->put("/tareas/{$tarea->id}", [
            'perfil_id' => $perfil->id,
            'titulo' => 'Actualizada',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/hogar');

        $this->assertDatabaseHas('tareas', ['id' => $tarea->id, 'titulo' => 'Actualizada']);
    }

    public function test_a_tarea_cannot_be_updated_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $tarea = Tarea::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)
            ->put("/tareas/{$tarea->id}", ['perfil_id' => $perfilAjeno->id, 'titulo' => 'Hackeada'])
            ->assertForbidden();
    }

    public function test_a_tarea_can_be_deleted_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $tarea = Tarea::factory()->for($perfil)->create();

        $this->actingAs($casa)
            ->delete("/tareas/{$tarea->id}")
            ->assertRedirect('/hogar');

        $this->assertDatabaseMissing('tareas', ['id' => $tarea->id]);
    }

    public function test_a_tarea_cannot_be_deleted_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $tarea = Tarea::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)
            ->delete("/tareas/{$tarea->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('tareas', ['id' => $tarea->id]);
    }

    public function test_a_tarea_can_be_completed_and_reopened()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $tarea = Tarea::factory()->for($perfil)->create();

        $this->actingAs($casa)
            ->patch("/tareas/{$tarea->id}/completar", ['perfil_id' => $perfil->id])
            ->assertRedirect('/hogar');

        $tarea->refresh();
        $this->assertNotNull($tarea->completada_el);
        $this->assertEquals($perfil->id, $tarea->completada_por_id);

        // Volver a llamar la reabre.
        $this->actingAs($casa)
            ->patch("/tareas/{$tarea->id}/completar", ['perfil_id' => $perfil->id])
            ->assertRedirect('/hogar');

        $tarea->refresh();
        $this->assertNull($tarea->completada_el);
        $this->assertNull($tarea->completada_por_id);
    }

    public function test_a_tarea_cannot_be_completed_with_a_perfil_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $tarea = Tarea::factory()->for($perfil)->create();

        $this->actingAs($casa)
            ->patch("/tareas/{$tarea->id}/completar", ['perfil_id' => $perfilAjeno->id])
            ->assertSessionHasErrors('perfil_id');
    }

    public function test_a_tarea_cannot_be_completed_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $tarea = Tarea::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)
            ->patch("/tareas/{$tarea->id}/completar", ['perfil_id' => $perfilAjeno->id])
            ->assertForbidden();
    }
}
