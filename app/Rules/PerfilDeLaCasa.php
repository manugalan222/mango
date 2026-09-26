<?php

namespace App\Rules;

use App\Models\Perfil;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Valida que el id recibido sea un perfil que existe y pertenece a la casa
 * logueada. Se usa en todo campo que apunte a un perfil (asignados, deudor,
 * quien completa una tarea, etc.), porque `perfil_id` viaja en el request y
 * todavía no hay perfil activo en sesión.
 */
class PerfilDeLaCasa implements ValidationRule
{
    public function __construct(private readonly int $casaId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $existe = Perfil::query()
            ->whereKey($value)
            ->where('user_id', $this->casaId)
            ->exists();

        if (! $existe) {
            $fail('El :attribute tiene que ser un perfil de tu casa.');
        }
    }
}
