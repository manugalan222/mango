<?php

namespace App\Http\Requests\Tarea;

use App\Rules\PerfilDeLaCasa;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TareaRequest extends FormRequest
{
    /**
     * Sólo la casa dueña de la tarea puede editarla. Al crear todavía no hay
     * modelo de ruta, así que se autoriza siempre.
     */
    public function authorize(): bool
    {
        $tarea = $this->route('tarea');

        return $tarea === null || $tarea->perfil->user_id === $this->user()->id;
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
            'titulo' => ['required', 'string', 'max:150'],
            'descripcion' => ['nullable', 'string'],
            'vence_el' => ['nullable', 'date'],
            'asignados' => ['nullable', 'array'],
            'asignados.*' => ['distinct', 'integer', new PerfilDeLaCasa($casaId)],
        ];
    }
}
