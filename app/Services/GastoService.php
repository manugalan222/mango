<?php

namespace App\Services;

use App\Models\Gasto;
use App\Models\User;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class GastoService
{
    /**
     * Los gastos de la casa, más recientes primero. La casa se deriva de
     * perfil_id -> perfiles.user_id.
     */
    public function listarDeCasa(User $casa): Collection
    {
        return Gasto::query()
            ->whereRelation('perfil', 'user_id', $casa->id)
            ->with(['perfil', 'categoria'])
            ->orderByDesc('fecha')
            ->get();
    }

    public function crear(array $datos): Gasto
    {
        return Gasto::create($datos);
    }

    public function actualizar(Gasto $gasto, array $datos): Gasto
    {
        $gasto->update($datos);

        return $gasto;
    }

    public function eliminar(Gasto $gasto): void
    {
        $gasto->delete();
    }

    /**
     * Total gastado por categoría en un mes, para el gráfico de Finanzas.
     * Un solo groupBy: nada de N+1 por categoría.
     */
    public function totalesPorCategoria(User $casa, CarbonInterface $mes): Collection
    {
        return Gasto::query()
            ->select('categoria_id', DB::raw('SUM(monto) as total'))
            ->whereRelation('perfil', 'user_id', $casa->id)
            ->whereYear('fecha', $mes->year)
            ->whereMonth('fecha', $mes->month)
            ->groupBy('categoria_id')
            ->with('categoria')
            ->get();
    }
}
