<?php

use App\Http\Controllers\PerfilController;
use App\Services\PerfilService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Sin bienvenida de Laravel/Inertia: quien llega a la raíz va directo a su
// casa si ya entró, o a la puerta si todavía no.
Route::get('/', function (Request $request) {
    return $request->user() ? redirect()->route('dashboard') : redirect()->route('login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (Request $request, PerfilService $perfiles) {
        return Inertia::render('dashboard', [
            'perfiles' => $perfiles->listarDeCasa($request->user()),
        ]);
    })->name('dashboard');

    Route::get('finanzas', function () {
        return Inertia::render('finanzas/index');
    })->name('finanzas.index');

    Route::get('hogar', function () {
        return Inertia::render('hogar/index');
    })->name('hogar.index');

    Route::get('perfiles', [PerfilController::class, 'index'])->name('perfiles.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/internal_api.php';
