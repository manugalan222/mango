<?php

namespace App\Http\Requests\Nota;

use App\Rules\PerfilDeLaCasa;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class NotaRequest extends FormRequest
{
    /**
     * Sólo la casa dueña de la nota puede editarla. Al crear todavía no hay
     * modelo de ruta, así que se autoriza siempre.
     */
    public function authorize(): bool
    {
        $nota = $this->route('nota');

        return $nota === null || $nota->perfil->user_id === $this->user()->id;
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
            'titulo' => ['nullable', 'string', 'max:120'],
            'contenido' => ['required', 'string'],
            'fijada' => ['nullable', 'boolean'],
        ];
    }
}
