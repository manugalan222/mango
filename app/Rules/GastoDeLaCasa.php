<?php

namespace App\Rules;

use App\Models\Gasto;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Valida que el id recibido sea un gasto que existe y pertenece a la casa
 * logueada (vía gasto.perfil.user_id). Se usa en deudas, donde `gasto_id`
 * es opcional pero si viene tiene que ser un gasto propio.
 */
class GastoDeLaCasa implements ValidationRule
{
    public function __construct(private readonly int $casaId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $existe = Gasto::query()
            ->whereKey($value)
            ->whereRelation('perfil', 'user_id', $this->casaId)
            ->exists();

        if (! $existe) {
            $fail('El :attribute tiene que ser un gasto de tu casa.');
        }
    }
}
