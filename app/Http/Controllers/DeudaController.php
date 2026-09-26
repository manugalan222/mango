<?php

namespace App\Http\Controllers;

use App\Http\Requests\Deuda\DeudaRequest;
use App\Models\Deuda;
use App\Services\DeudaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DeudaController extends Controller
{
    public function __construct(private readonly DeudaService $deudas) {}

    public function store(DeudaRequest $request): RedirectResponse
    {
        $this->deudas->crear($request->validated());

        return to_route('finanzas.index');
    }

    public function update(DeudaRequest $request, Deuda $deuda): RedirectResponse
    {
        $this->deudas->actualizar($deuda, $request->validated());

        return to_route('finanzas.index');
    }

    public function destroy(Request $request, Deuda $deuda): RedirectResponse
    {
        abort_if($deuda->perfil->user_id !== $request->user()->id, 403);

        $this->deudas->eliminar($deuda);

        return to_route('finanzas.index');
    }

    /**
     * Marca la deuda como saldada.
     */
    public function saldar(Request $request, Deuda $deuda): RedirectResponse
    {
        abort_if($deuda->perfil->user_id !== $request->user()->id, 403);

        $this->deudas->saldar($deuda);

        return to_route('finanzas.index');
    }
}
