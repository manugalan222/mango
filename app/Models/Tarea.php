<?php

namespace App\Models;

use Database\Factories\TareaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tarea extends Model
{
    /** @use HasFactory<TareaFactory> */
    use HasFactory;

    protected $table = 'tareas';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'perfil_id',
        'titulo',
        'descripcion',
        'vence_el',
        'completada_el',
        'completada_por_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'vence_el' => 'date',
            'completada_el' => 'datetime',
        ];
    }

    /**
     * El perfil que creó la tarea.
     */
    public function perfil(): BelongsTo
    {
        return $this->belongsTo(Perfil::class);
    }

    /**
     * Alias de `perfil`, en términos de la tarea: quien la creó.
     */
    public function creador(): BelongsTo
    {
        return $this->belongsTo(Perfil::class, 'perfil_id');
    }

    /**
     * El perfil que la marcó como completada, si está completada.
     */
    public function completadaPor(): BelongsTo
    {
        return $this->belongsTo(Perfil::class, 'completada_por_id');
    }

    /**
     * Los perfiles asignados a esta tarea.
     */
    public function asignados(): BelongsToMany
    {
        return $this->belongsToMany(Perfil::class, 'perfiles_x_tareas')->withTimestamps();
    }
}
