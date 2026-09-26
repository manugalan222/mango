<?php

namespace App\Models;

use Database\Factories\NotaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Nota extends Model
{
    /** @use HasFactory<NotaFactory> */
    use HasFactory;

    protected $table = 'notas';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'perfil_id',
        'titulo',
        'contenido',
        'fijada',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fijada' => 'boolean',
        ];
    }

    /**
     * El perfil autor de la nota.
     */
    public function perfil(): BelongsTo
    {
        return $this->belongsTo(Perfil::class);
    }
}
