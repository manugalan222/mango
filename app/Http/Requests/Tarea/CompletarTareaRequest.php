<?php

namespace App\Http\Requests\Tarea;

use App\Rules\PerfilDeLaCasa;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CompletarTareaRequest extends FormRequest
{
    /**
     * Sólo la casa dueña de la tarea puede completarla/reabrirla.
     */
    public function authorize(): bool
    {
        return $this->route('tarea')->perfil->user_id === $this->user()->id;
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
        ];
    }
}
