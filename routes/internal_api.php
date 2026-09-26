<?php

use App\Http\Controllers\DeudaController;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\TareaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Internal API
|--------------------------------------------------------------------------
|
| Los endpoints que el propio frontend de MANGO usa para mutar datos (store,
| update, destroy) vía Inertia. No es una API pública: corre bajo el stack de
| `web` (sesión + CSRF), no bajo `api`, porque el frontend no manda un token,
| manda la cookie de sesión. `index`/`show` quedan afuera: esos son vistas y
| se registran en `web.php`, no acá.
|
*/

Route::middleware(['auth'])->group(function () {
    Route::apiResource('perfiles', PerfilController::class)
        ->parameters(['perfiles' => 'perfil'])
        ->except(['index', 'show']);

    Route::post('perfiles/{perfil}/entrar', [PerfilController::class, 'entrar'])
        ->name('perfiles.entrar');

    Route::apiResource('notas', NotaController::class)
        ->parameters(['notas' => 'nota'])
        ->except(['index', 'show']);

    Route::apiResource('tareas', TareaController::class)
        ->parameters(['tareas' => 'tarea'])
        ->except(['index', 'show']);

    Route::patch('tareas/{tarea}/completar', [TareaController::class, 'completar'])
        ->name('tareas.completar');

    Route::apiResource('gastos', GastoController::class)
        ->parameters(['gastos' => 'gasto'])
        ->except(['index', 'show']);

    Route::apiResource('deudas', DeudaController::class)
        ->parameters(['deudas' => 'deuda'])
        ->except(['index', 'show']);

    Route::patch('deudas/{deuda}/saldar', [DeudaController::class, 'saldar'])
        ->name('deudas.saldar');
});
