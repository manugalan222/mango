<?php

namespace App\Http\Requests\Perfil;

use App\Enums\ColorPerfil;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PerfilRequest extends FormRequest
{
    /**
     * Sólo la casa dueña del perfil puede editarlo. Al crear todavía no hay
     * modelo de ruta, así que se autoriza siempre.
     */
    public function authorize(): bool
    {
        $perfil = $this->route('perfil');

        return $perfil === null || $perfil->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->user()->id;
        $perfilId = $this->route('perfil')?->id;

        return [
            'nombre' => [
                'required',
                'string',
                'max:100',
                Rule::unique('perfiles')->where('user_id', $userId)->ignore($perfilId),
            ],
            'color' => [
                'required',
                Rule::enum(ColorPerfil::class),
                Rule::unique('perfiles')->where('user_id', $userId)->ignore($perfilId),
            ],
            // Vacío al editar = se deja el PIN que ya tenía; para sacarlo
            // se manda `quitar_pin`.
            'pin' => ['nullable', 'string', 'digits_between:4,6'],
            'quitar_pin' => ['sometimes', 'boolean'],
        ];
    }
}
