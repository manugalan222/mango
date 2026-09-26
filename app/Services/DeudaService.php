<?php

namespace App\Services;

use App\Models\Deuda;
use App\Models\Perfil;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class DeudaService
{
    /**
     * Las deudas de la casa, más recientes primero. La casa se deriva de
     * perfil_id -> perfiles.user_id (el acreedor siempre es de la casa).
     */
    public function listarDeCasa(User $casa): Collection
    {
        return Deuda::query()
            ->whereRelation('perfil', 'user_id', $casa->id)
            ->with(['perfil', 'deudor', 'gasto'])
            ->orderByDesc('created_at')
            ->get();
    }

    public function crear(array $datos): Deuda
    {
        return Deuda::create($datos);
    }

    public function actualizar(Deuda $deuda, array $datos): Deuda
    {
        $deuda->update($datos);

        return $deuda;
    }

    public function eliminar(Deuda $deuda): void
    {
        $deuda->delete();
    }

    public function saldar(Deuda $deuda): Deuda
    {
        $deuda->update(['saldada_el' => now()]);

        return $deuda;
    }

    /**
     * Neto de deudas no saldadas entre dos perfiles: positivo si $b le debe
     * a $a, negativo si $a le debe a $b. Resta las deudas en un sentido con
     * las del otro para no arrastrar vueltos cruzados.
     */
    public function saldoEntre(Perfil $a, Perfil $b): float
    {
        $aFavorDeA = Deuda::query()
            ->where('perfil_id', $a->id)
            ->where('deudor_id', $b->id)
            ->whereNull('saldada_el')
            ->sum('monto');

        $aFavorDeB = Deuda::query()
            ->where('perfil_id', $b->id)
            ->where('deudor_id', $a->id)
            ->whereNull('saldada_el')
            ->sum('monto');

        return (float) $aFavorDeA - (float) $aFavorDeB;
    }
}
