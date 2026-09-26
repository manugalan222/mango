<?php

namespace App\Http\Controllers;

use App\Http\Requests\Gasto\GastoRequest;
use App\Models\Gasto;
use App\Services\GastoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GastoController extends Controller
{
    public function __construct(private readonly GastoService $gastos) {}

    public function store(GastoRequest $request): RedirectResponse
    {
        $this->gastos->crear($request->validated());

        return to_route('finanzas.index');
    }

    public function update(GastoRequest $request, Gasto $gasto): RedirectResponse
    {
        $this->gastos->actualizar($gasto, $request->validated());

        return to_route('finanzas.index');
    }

    public function destroy(Request $request, Gasto $gasto): RedirectResponse
    {
        abort_if($gasto->perfil->user_id !== $request->user()->id, 403);

        $this->gastos->eliminar($gasto);

        return to_route('finanzas.index');
    }
}
