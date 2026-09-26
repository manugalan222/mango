<?php

namespace App\Http\Requests\Gasto;

use App\Rules\PerfilDeLaCasa;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GastoRequest extends FormRequest
{
    /**
     * Sólo la casa dueña del gasto puede editarlo. Al crear todavía no hay
     * modelo de ruta, así que se autoriza siempre.
     */
    public function authorize(): bool
    {
        $gasto = $this->route('gasto');

        return $gasto === null || $gasto->perfil->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'perfil_id' => ['required', 'integer', new PerfilDeLaCasa($this->user()->id)],
            'categoria_id' => ['required', 'integer', Rule::exists('categorias', 'id')],
            'descripcion' => ['required', 'string', 'max:150'],
            'monto' => ['required', 'numeric', 'min:0.01', 'max:9999999999.99'],
            'fecha' => ['required', 'date'],
        ];
    }
}
