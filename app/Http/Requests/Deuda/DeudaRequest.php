<?php

namespace App\Http\Requests\Deuda;

use App\Rules\GastoDeLaCasa;
use App\Rules\PerfilDeLaCasa;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DeudaRequest extends FormRequest
{
    /**
     * Sólo la casa dueña de la deuda puede editarla. Al crear todavía no hay
     * modelo de ruta, así que se autoriza siempre.
     */
    public function authorize(): bool
    {
        $deuda = $this->route('deuda');

        return $deuda === null || $deuda->perfil->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $casaId = $this->user()->id;

        return [
            'perfil_id' => ['required', 'integer', new PerfilDeLaCasa($casaId)],
            'deudor_id' => ['required', 'integer', 'different:perfil_id', new PerfilDeLaCasa($casaId)],
            'gasto_id' => ['nullable', 'integer', new GastoDeLaCasa($casaId)],
            'concepto' => ['required', 'string', 'max:150'],
            'monto' => ['required', 'numeric', 'min:0.01', 'max:9999999999.99'],
        ];
    }
}
