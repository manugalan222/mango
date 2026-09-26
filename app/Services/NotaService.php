<?php

namespace App\Services;

use App\Models\Nota;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class NotaService
{
    /**
     * Las notas de la casa: fijadas primero, después las más recientes.
     * La casa no está en la tabla; se deriva de perfil_id -> perfiles.user_id.
     */
    public function listarDeCasa(User $casa): Collection
    {
        return Nota::query()
            ->whereRelation('perfil', 'user_id', $casa->id)
            ->with('perfil')
            ->orderByDesc('fijada')
            ->orderByDesc('created_at')
            ->get();
    }

    public function crear(array $datos): Nota
    {
        return Nota::create($datos);
    }

    public function actualizar(Nota $nota, array $datos): Nota
    {
        $nota->update($datos);

        return $nota;
    }

    public function eliminar(Nota $nota): void
    {
        $nota->delete();
    }
}
