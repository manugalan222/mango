<?php

namespace App\Http\Controllers;

use App\Http\Requests\Nota\NotaRequest;
use App\Models\Nota;
use App\Services\NotaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NotaController extends Controller
{
    public function __construct(private readonly NotaService $notas) {}

    public function store(NotaRequest $request): RedirectResponse
    {
        $this->notas->crear($request->validated());

        return to_route('hogar.index');
    }

    public function update(NotaRequest $request, Nota $nota): RedirectResponse
    {
        $this->notas->actualizar($nota, $request->validated());

        return to_route('hogar.index');
    }

    public function destroy(Request $request, Nota $nota): RedirectResponse
    {
        abort_if($nota->perfil->user_id !== $request->user()->id, 403);

        $this->notas->eliminar($nota);

        return to_route('hogar.index');
    }
}
