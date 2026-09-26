<?php

namespace App\Http\Controllers;

use App\Http\Requests\Perfil\EntrarPerfilRequest;
use App\Http\Requests\Perfil\PerfilRequest;
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

    public function store(PerfilRequest $request): RedirectResponse
    {
        $this->perfiles->crear($request->user(), $request->validated());

        return to_route('perfiles.index');
    }

    public function update(PerfilRequest $request, Perfil $perfil): RedirectResponse
    {
        $this->perfiles->actualizar($perfil, $request->validated());

        return to_route('perfiles.index');
    }

    /**
     * Elegir perfil en "¿Quién anda por casa?": si el PIN coincide (o no
     * tiene), el perfil queda activo en la sesión hasta cerrar sesión o
     * elegir otro.
     */
    public function entrar(EntrarPerfilRequest $request, Perfil $perfil): RedirectResponse
    {
        $this->perfiles->verificarEntrada($perfil, $request->validated('pin'));

        $request->session()->put('perfil_id', $perfil->id);

        return to_route('dashboard');
    }

    public function destroy(Request $request, Perfil $perfil): RedirectResponse
    {
        abort_if($perfil->user_id !== $request->user()->id, 403);

        $this->perfiles->eliminar($perfil);

        return to_route('perfiles.index');
    }
}
