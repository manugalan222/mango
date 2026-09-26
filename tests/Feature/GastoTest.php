<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\Gasto;
use App\Models\Perfil;
use App\Models\User;
use App\Services\GastoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class GastoTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_gasto_can_be_created()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $categoria = Categoria::factory()->create();

        $response = $this->actingAs($casa)->post('/gastos', [
            'perfil_id' => $perfil->id,
            'categoria_id' => $categoria->id,
            'descripcion' => 'Verdulería',
            'monto' => '1500.50',
            'fecha' => now()->toDateString(),
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/finanzas');

        $this->assertDatabaseHas('gastos', [
            'perfil_id' => $perfil->id,
            'descripcion' => 'Verdulería',
            'monto' => '1500.50',
        ]);
    }

    public function test_creating_a_gasto_requires_a_positive_monto()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $categoria = Categoria::factory()->create();

        $this->actingAs($casa)->post('/gastos', [
            'perfil_id' => $perfil->id,
            'categoria_id' => $categoria->id,
            'descripcion' => 'Nada',
            'monto' => '0',
            'fecha' => now()->toDateString(),
        ])->assertSessionHasErrors('monto');
    }

    public function test_a_gasto_cannot_be_created_with_a_perfil_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $categoria = Categoria::factory()->create();

        $this->actingAs($casa)->post('/gastos', [
            'perfil_id' => $perfilAjeno->id,
            'categoria_id' => $categoria->id,
            'descripcion' => 'Intento ajeno',
            'monto' => '100',
            'fecha' => now()->toDateString(),
        ])->assertSessionHasErrors('perfil_id');
    }

    public function test_a_gasto_can_be_updated_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $categoria = Categoria::factory()->create();
        $gasto = Gasto::factory()->for($perfil)->for($categoria)->create();

        $response = $this->actingAs($casa)->put("/gastos/{$gasto->id}", [
            'perfil_id' => $perfil->id,
            'categoria_id' => $categoria->id,
            'descripcion' => 'Actualizado',
            'monto' => '200',
            'fecha' => now()->toDateString(),
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/finanzas');

        $this->assertDatabaseHas('gastos', ['id' => $gasto->id, 'descripcion' => 'Actualizado']);
    }

    public function test_a_gasto_cannot_be_updated_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $categoria = Categoria::factory()->create();
        $gasto = Gasto::factory()->for($perfilAjeno)->for($categoria)->create();

        $this->actingAs($casa)
            ->put("/gastos/{$gasto->id}", [
                'perfil_id' => $perfilAjeno->id,
                'categoria_id' => $categoria->id,
                'descripcion' => 'Hackeado',
                'monto' => '10',
                'fecha' => now()->toDateString(),
            ])
            ->assertForbidden();
    }

    public function test_a_gasto_can_be_deleted_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $gasto = Gasto::factory()->for($perfil)->create();

        $this->actingAs($casa)
            ->delete("/gastos/{$gasto->id}")
            ->assertRedirect('/finanzas');

        $this->assertDatabaseMissing('gastos', ['id' => $gasto->id]);
    }

    public function test_a_gasto_cannot_be_deleted_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $gasto = Gasto::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)
            ->delete("/gastos/{$gasto->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('gastos', ['id' => $gasto->id]);
    }

    public function test_totales_por_categoria_sums_only_the_current_month_and_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $categoria = Categoria::factory()->create();

        Gasto::factory()->for($perfil)->for($categoria)->create(['monto' => 100, 'fecha' => now()]);
        Gasto::factory()->for($perfil)->for($categoria)->create(['monto' => 50, 'fecha' => now()]);
        // Mes pasado: no debe contar.
        Gasto::factory()->for($perfil)->for($categoria)->create(['monto' => 999, 'fecha' => now()->subMonths(2)]);
        // Otra casa: no debe contar.
        Gasto::factory()->for($perfilAjeno)->for($categoria)->create(['monto' => 999, 'fecha' => now()]);

        $totales = (new GastoService)->totalesPorCategoria($casa, Carbon::now());

        $this->assertCount(1, $totales);
        $this->assertEquals(150, (float) $totales->first()->total);
    }
}
