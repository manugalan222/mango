<?php

namespace App\Http\Requests\Perfil;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class EntrarPerfilRequest extends FormRequest
{
    /**
     * Sólo se entra a un perfil de la propia casa.
     */
    public function authorize(): bool
    {
        return $this->route('perfil')->user_id === $this->user()->id;
    }

    /**
     * El PIN sólo se exige si el perfil tiene uno. Que coincida lo chequea el
     * Service, no la validación: acá sólo se mira la forma.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pin' => $this->route('perfil')->tiene_pin
                ? ['required', 'string', 'digits_between:4,6']
                : ['nullable'],
        ];
    }
}
