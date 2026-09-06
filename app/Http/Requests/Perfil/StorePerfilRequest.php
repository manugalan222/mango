<?php

namespace App\Http\Requests\Perfil;

use App\Enums\ColorPerfil;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePerfilRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'nombre' => [
                'required',
                'string',
                'max:100',
                Rule::unique('perfiles')->where('user_id', $userId),
            ],
            'color' => [
                'required',
                Rule::enum(ColorPerfil::class),
                Rule::unique('perfiles')->where('user_id', $userId),
            ],
            'pin' => ['nullable', 'string', 'digits_between:4,6'],
        ];
    }
}
