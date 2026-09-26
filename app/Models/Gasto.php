<?php

namespace App\Models;

use Database\Factories\GastoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Gasto extends Model
{
    /** @use HasFactory<GastoFactory> */
    use HasFactory;

    protected $table = 'gastos';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'perfil_id',
        'categoria_id',
        'descripcion',
        'monto',
        'fecha',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'monto' => 'decimal:2',
            'fecha' => 'date',
        ];
    }

    /**
     * El perfil que pagó el gasto.
     */
    public function perfil(): BelongsTo
    {
        return $this->belongsTo(Perfil::class);
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
}
