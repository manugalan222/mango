<?php

use App\Http\Controllers\PerfilController;
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
});
