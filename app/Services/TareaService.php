<?php

namespace App\Services;

use App\Models\Perfil;
use App\Models\Tarea;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TareaService
{
    /**
     * Las tareas de la casa, con los asignados ya cargados para no pegarle
     * a la base una vez por fila. La casa se deriva de perfil_id -> perfiles.user_id.
     */
    public function listarDeCasa(User $casa): Collection
    {
        return Tarea::query()
            ->whereRelation('perfil', 'user_id', $casa->id)
            ->with(['perfil', 'asignados', 'completadaPor'])
            ->orderBy('completada_el')
            ->orderBy('vence_el')
            ->get();
    }

    public function crear(array $datos): Tarea
    {
        return DB::transaction(function () use ($datos) {
            $asignados = $datos['asignados'] ?? [];
            unset($datos['asignados']);

            $tarea = Tarea::create($datos);
            $tarea->asignados()->sync($asignados);

            return $tarea;
        });
    }

    public function actualizar(Tarea $tarea, array $datos): Tarea
    {
        return DB::transaction(function () use ($tarea, $datos) {
            $asignados = $datos['asignados'] ?? [];
            unset($datos['asignados']);

            $tarea->update($datos);
            $tarea->asignados()->sync($asignados);

            return $tarea;
        });
    }

    public function eliminar(Tarea $tarea): void
    {
        $tarea->delete();
    }

    /**
     * Completa la tarea si estaba pendiente, o la reabre si ya estaba
     * completada. Registra quién hizo el cambio cuando completa.
     */
    public function alternarCompletada(Tarea $tarea, Perfil $quien): Tarea
    {
        if ($tarea->completada_el) {
            $tarea->update(['completada_el' => null, 'completada_por_id' => null]);
        } else {
            $tarea->update(['completada_el' => now(), 'completada_por_id' => $quien->id]);
        }

        return $tarea;
    }
}
