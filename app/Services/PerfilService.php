<?php

namespace App\Services;

use App\Models\Perfil;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class PerfilService
{
    /**
     * Los perfiles de la casa, en el orden en que se crearon.
     */
    public function listarDeCasa(User $casa): Collection
    {
        return $casa->perfiles()->orderBy('id')->get();
    }

    public function crear(User $casa, array $datos): Perfil
    {
        return $casa->perfiles()->create($datos);
    }

    public function actualizar(Perfil $perfil, array $datos): Perfil
    {
        $perfil->update($datos);

        return $perfil;
    }

    public function eliminar(Perfil $perfil): void
    {
        $perfil->delete();
    }
}
