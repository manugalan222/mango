<?php

namespace Tests\Feature;

use App\Models\Deuda;
use App\Models\Gasto;
use App\Models\Perfil;
use App\Models\User;
use App\Services\DeudaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeudaTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_deuda_can_be_created()
    {
        $casa = User::factory()->create();
        $acreedor = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $deudor = Perfil::factory()->for($casa)->create(['color' => 'verde']);

        $response = $this->actingAs($casa)->post('/deudas', [
            'perfil_id' => $acreedor->id,
            'deudor_id' => $deudor->id,
            'concepto' => 'Mitad del alquiler',
            'monto' => '50000',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/finanzas');

        $this->assertDatabaseHas('deudas', [
            'perfil_id' => $acreedor->id,
            'deudor_id' => $deudor->id,
            'concepto' => 'Mitad del alquiler',
        ]);
    }

    public function test_a_deuda_cannot_have_the_same_acreedor_and_deudor()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $this->actingAs($casa)->post('/deudas', [
            'perfil_id' => $perfil->id,
            'deudor_id' => $perfil->id,
            'concepto' => 'Loop',
            'monto' => '10',
        ])->assertSessionHasErrors('deudor_id');
    }

    public function test_a_deuda_cannot_be_created_with_a_deudor_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $acreedor = Perfil::factory()->for($casa)->create();
        $deudorAjeno = Perfil::factory()->for($otraCasa)->create();

        $this->actingAs($casa)->post('/deudas', [
            'perfil_id' => $acreedor->id,
            'deudor_id' => $deudorAjeno->id,
            'concepto' => 'Intento ajeno',
            'monto' => '10',
        ])->assertSessionHasErrors('deudor_id');
    }

    public function test_a_deuda_cannot_reference_a_gasto_from_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $acreedor = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $deudor = Perfil::factory()->for($casa)->create(['color' => 'verde']);
        $perfilAjeno = Perfil::factory()->for($otraCasa)->create();
        $gastoAjeno = Gasto::factory()->for($perfilAjeno)->create();

        $this->actingAs($casa)->post('/deudas', [
            'perfil_id' => $acreedor->id,
            'deudor_id' => $deudor->id,
            'gasto_id' => $gastoAjeno->id,
            'concepto' => 'Con gasto ajeno',
            'monto' => '10',
        ])->assertSessionHasErrors('gasto_id');
    }

    public function test_a_deuda_can_be_updated_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $acreedor = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $deudor = Perfil::factory()->for($casa)->create(['color' => 'verde']);
        $deuda = Deuda::factory()->create(['perfil_id' => $acreedor->id, 'deudor_id' => $deudor->id]);

        $response = $this->actingAs($casa)->put("/deudas/{$deuda->id}", [
            'perfil_id' => $acreedor->id,
            'deudor_id' => $deudor->id,
            'concepto' => 'Actualizada',
            'monto' => '999',
        ]);

        $response->assertSessionHasNoErrors()->assertRedirect('/finanzas');

        $this->assertDatabaseHas('deudas', ['id' => $deuda->id, 'concepto' => 'Actualizada']);
    }

    public function test_a_deuda_cannot_be_updated_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $acreedorAjeno = Perfil::factory()->for($otraCasa)->create(['color' => 'mango']);
        $deudorAjeno = Perfil::factory()->for($otraCasa)->create(['color' => 'verde']);
        $deuda = Deuda::factory()->create(['perfil_id' => $acreedorAjeno->id, 'deudor_id' => $deudorAjeno->id]);

        $this->actingAs($casa)
            ->put("/deudas/{$deuda->id}", [
                'perfil_id' => $acreedorAjeno->id,
                'deudor_id' => $deudorAjeno->id,
                'concepto' => 'Hackeada',
                'monto' => '1',
            ])
            ->assertForbidden();
    }

    public function test_a_deuda_can_be_deleted_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $acreedor = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $deudor = Perfil::factory()->for($casa)->create(['color' => 'verde']);
        $deuda = Deuda::factory()->create(['perfil_id' => $acreedor->id, 'deudor_id' => $deudor->id]);

        $this->actingAs($casa)
            ->delete("/deudas/{$deuda->id}")
            ->assertRedirect('/finanzas');

        $this->assertDatabaseMissing('deudas', ['id' => $deuda->id]);
    }

    public function test_a_deuda_cannot_be_deleted_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $acreedorAjeno = Perfil::factory()->for($otraCasa)->create(['color' => 'mango']);
        $deudorAjeno = Perfil::factory()->for($otraCasa)->create(['color' => 'verde']);
        $deuda = Deuda::factory()->create(['perfil_id' => $acreedorAjeno->id, 'deudor_id' => $deudorAjeno->id]);

        $this->actingAs($casa)
            ->delete("/deudas/{$deuda->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('deudas', ['id' => $deuda->id]);
    }

    public function test_a_deuda_can_be_saldada_by_its_own_casa()
    {
        $casa = User::factory()->create();
        $acreedor = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $deudor = Perfil::factory()->for($casa)->create(['color' => 'verde']);
        $deuda = Deuda::factory()->create(['perfil_id' => $acreedor->id, 'deudor_id' => $deudor->id]);

        $this->actingAs($casa)
            ->patch("/deudas/{$deuda->id}/saldar")
            ->assertRedirect('/finanzas');

        $this->assertNotNull($deuda->fresh()->saldada_el);
    }

    public function test_a_deuda_cannot_be_saldada_by_another_casa()
    {
        $casa = User::factory()->create();
        $otraCasa = User::factory()->create();
        $acreedorAjeno = Perfil::factory()->for($otraCasa)->create(['color' => 'mango']);
        $deudorAjeno = Perfil::factory()->for($otraCasa)->create(['color' => 'verde']);
        $deuda = Deuda::factory()->create(['perfil_id' => $acreedorAjeno->id, 'deudor_id' => $deudorAjeno->id]);

        $this->actingAs($casa)
            ->patch("/deudas/{$deuda->id}/saldar")
            ->assertForbidden();

        $this->assertNull($deuda->fresh()->saldada_el);
    }

    public function test_saldo_entre_nets_debts_in_both_directions()
    {
        $casa = User::factory()->create();
        $a = Perfil::factory()->for($casa)->create(['color' => 'mango']);
        $b = Perfil::factory()->for($casa)->create(['color' => 'verde']);

        // A puso 300 que le debe B.
        Deuda::factory()->create(['perfil_id' => $a->id, 'deudor_id' => $b->id, 'monto' => 300]);
        // B puso 100 que le debe A.
        Deuda::factory()->create(['perfil_id' => $b->id, 'deudor_id' => $a->id, 'monto' => 100]);
        // Ya saldada: no debe contar.
        Deuda::factory()->saldada()->create(['perfil_id' => $a->id, 'deudor_id' => $b->id, 'monto' => 999]);

        $saldo = (new DeudaService)->saldoEntre($a, $b);

        $this->assertEquals(200.0, $saldo);
    }
}
