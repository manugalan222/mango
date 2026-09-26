<?php

namespace App\Models;

use Database\Factories\DeudaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deuda extends Model
{
    /** @use HasFactory<DeudaFactory> */
    use HasFactory;

    protected $table = 'deudas';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'perfil_id',
        'deudor_id',
        'gasto_id',
        'concepto',
        'monto',
        'saldada_el',
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
            'saldada_el' => 'datetime',
        ];
    }

    /**
     * El acreedor: quien puso la plata.
     */
    public function perfil(): BelongsTo
    {
        return $this->belongsTo(Perfil::class);
    }

    /**
     * El deudor.
     */
    public function deudor(): BelongsTo
    {
        return $this->belongsTo(Perfil::class, 'deudor_id');
    }

    public function gasto(): BelongsTo
    {
        return $this->belongsTo(Gasto::class);
    }
}
