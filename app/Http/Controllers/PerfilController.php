<?php

namespace App\Http\Controllers;

use App\Http\Requests\Perfil\StorePerfilRequest;
use App\Http\Requests\Perfil\UpdatePerfilRequest;
use App\Models\Perfil;
use App\Services\PerfilService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PerfilController extends Controller
{
    public function __construct(private readonly PerfilService $perfiles) {}

    public function index(Request $request): Response
    {
        return Inertia::render('perfiles/index', [
            'perfiles' => $this->perfiles->listarDeCasa($request->user()),
        ]);
    }

    public function store(StorePerfilRequest $request): RedirectResponse
    {
        $this->perfiles->crear($request->user(), $request->validated());

        return to_route('perfiles.index');
    }

    public function update(UpdatePerfilRequest $request, Perfil $perfil): RedirectResponse
    {
        $this->perfiles->actualizar($perfil, $request->validated());

        return to_route('perfiles.index');
    }

    public function destroy(Request $request, Perfil $perfil): RedirectResponse
    {
        abort_if($perfil->user_id !== $request->user()->id, 403);

        $this->perfiles->eliminar($perfil);

        return to_route('perfiles.index');
    }
}
