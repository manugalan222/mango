<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * La casa entra con su correo, pero adentro anda un conviviente: sin perfil
 * elegido (y con el PIN, si tiene) se vuelve a "¿Quién anda por casa?".
 * También cubre el perfil que se borró mientras estaba activo.
 */
class EnsurePerfilElegido
{
    public function handle(Request $request, Closure $next): Response
    {
        $perfilId = $request->session()->get('perfil_id');

        if (! $perfilId || ! $request->user()->perfiles()->whereKey($perfilId)->exists()) {
            $request->session()->forget('perfil_id');

            return to_route('perfiles.index');
        }

        return $next($request);
    }
}
