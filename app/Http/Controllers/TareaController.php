<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tarea\CompletarTareaRequest;
use App\Http\Requests\Tarea\TareaRequest;
use App\Models\Perfil;
use App\Models\Tarea;
use App\Services\TareaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    public function __construct(private readonly TareaService $tareas) {}

    public function store(TareaRequest $request): RedirectResponse
    {
        $this->tareas->crear($request->validated());

        return to_route('hogar.index');
    }

    public function update(TareaRequest $request, Tarea $tarea): RedirectResponse
    {
        $this->tareas->actualizar($tarea, $request->validated());

        return to_route('hogar.index');
    }

    public function destroy(Request $request, Tarea $tarea): RedirectResponse
    {
        abort_if($tarea->perfil->user_id !== $request->user()->id, 403);

        $this->tareas->eliminar($tarea);

        return to_route('hogar.index');
    }

    /**
     * Completa la tarea, o la reabre si ya estaba completada.
     */
    public function completar(CompletarTareaRequest $request, Tarea $tarea): RedirectResponse
    {
        $quien = Perfil::findOrFail($request->validated('perfil_id'));

        $this->tareas->alternarCompletada($tarea, $quien);

        return to_route('hogar.index');
    }
}
