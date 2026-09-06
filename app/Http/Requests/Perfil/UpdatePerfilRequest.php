<?php

namespace App\Http\Requests\Perfil;

use App\Enums\ColorPerfil;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePerfilRequest extends FormRequest
{
    /**
     * Sólo la casa dueña del perfil puede editarlo.
     */
    public function authorize(): bool
    {
        return $this->route('perfil')->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->user()->id;
        $perfilId = $this->route('perfil')->id;

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
            'pin' => ['nullable', 'string', 'digits_between:4,6'],
        ];
    }
}
