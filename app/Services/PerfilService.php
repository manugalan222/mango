<?php

namespace App\Services;

use App\Models\Perfil;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class PerfilService
{
    /**
     * Los perfiles de la casa, en el orden en que se crearon.
     */
    public function listarDeCasa(User $casa): Collection
    {
        return $casa->perfiles()->orderBy('id')->get();
    }

    public function crear(User $casa, array $datos): Perfil
    {
        unset($datos['quitar_pin']);

        return $casa->perfiles()->create($datos);
    }

    /**
     * El PIN no viaja al frontend, así que el formulario de edición siempre
     * lo manda vacío: vacío significa "dejar el que tenía", no "sacarlo".
     * Para sacarlo hay que pedirlo explícito con `quitar_pin`.
     */
    public function actualizar(Perfil $perfil, array $datos): Perfil
    {
        if (! empty($datos['quitar_pin'])) {
            $datos['pin'] = null;
        } elseif (empty($datos['pin'])) {
            unset($datos['pin']);
        }

        unset($datos['quitar_pin']);

        $perfil->update($datos);

        return $perfil;
    }

    public function eliminar(Perfil $perfil): void
    {
        $perfil->delete();
    }

    /**
     * Chequea el PIN (si el perfil tiene) antes de dejar entrar. Cinco
     * intentos fallidos por perfil y la casa espera: un PIN de 4 números se
     * adivina rápido si no hay freno.
     *
     * @throws ValidationException
     */
    public function verificarEntrada(Perfil $perfil, ?string $pin): void
    {
        if (! $perfil->tiene_pin) {
            return;
        }

        $clave = 'perfil-pin:'.$perfil->id;

        if (RateLimiter::tooManyAttempts($clave, 5)) {
            throw ValidationException::withMessages([
                'pin' => __('auth.throttle', ['seconds' => RateLimiter::availableIn($clave)]),
            ]);
        }

        if (! Hash::check((string) $pin, $perfil->pin)) {
            RateLimiter::hit($clave);

            throw ValidationException::withMessages(['pin' => __('auth.pin')]);
        }

        RateLimiter::clear($clave);
    }
}
