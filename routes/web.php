<?php

use App\Http\Controllers\PerfilController;
use App\Models\Categoria;
use App\Services\DeudaService;
use App\Services\GastoService;
use App\Services\NotaService;
use App\Services\PerfilService;
use App\Services\TareaService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Sin bienvenida de Laravel/Inertia: quien llega a la raíz va directo a su
// casa si ya entró, o a la puerta si todavía no.
Route::get('/', function (Request $request) {
    return $request->user() ? redirect()->route('dashboard') : redirect()->route('login');
})->name('home');

// Adentro de la casa hace falta, además de la sesión de la casa, un perfil
// elegido. `/perfiles` queda afuera: es donde se elige.
Route::middleware(['auth', 'perfil'])->group(function () {
    Route::get('dashboard', function (Request $request, PerfilService $perfiles) {
        return Inertia::render('dashboard', [
            'perfiles' => $perfiles->listarDeCasa($request->user()),
        ]);
    })->name('dashboard');

    Route::get('finanzas', function (Request $request, GastoService $gastos, DeudaService $deudas) {
        return Inertia::render('finanzas/index', [
            'gastos' => $gastos->listarDeCasa($request->user()),
            'totalesPorCategoria' => $gastos->totalesPorCategoria($request->user(), Carbon::now()),
            'categorias' => Categoria::orderBy('nombre')->get(),
            'deudas' => $deudas->listarDeCasa($request->user()),
        ]);
    })->name('finanzas.index');

    Route::get('hogar', function (Request $request, NotaService $notas, TareaService $tareas) {
        return Inertia::render('hogar/index', [
            'notas' => $notas->listarDeCasa($request->user()),
            'tareas' => $tareas->listarDeCasa($request->user()),
        ]);
    })->name('hogar.index');
});

Route::middleware(['auth'])->group(function () {
    Route::get('perfiles', [PerfilController::class, 'index'])->name('perfiles.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/internal_api.php';
