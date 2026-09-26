<?php

namespace App\Models;

use App\Enums\ColorPerfil;
use Database\Factories\PerfilFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Perfil extends Model
{
    /** @use HasFactory<PerfilFactory> */
    use HasFactory;

    protected $table = 'perfiles';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nombre',
        'color',
        'pin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'pin',
    ];

    /**
     * El hash del PIN nunca viaja al frontend, pero el selector de perfiles
     * necesita saber si tiene que pedirlo.
     *
     * @var list<string>
     */
    protected $appends = [
        'tiene_pin',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'color' => ColorPerfil::class,
            'pin' => 'hashed',
        ];
    }

    protected function tienePin(): Attribute
    {
        return Attribute::get(fn () => $this->pin !== null);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Las notas que este perfil escribió.
     */
    public function notas(): HasMany
    {
        return $this->hasMany(Nota::class);
    }

    /**
     * Las tareas que este perfil creó.
     */
    public function tareasCreadas(): HasMany
    {
        return $this->hasMany(Tarea::class);
    }

    /**
     * Las tareas asignadas a este perfil.
     */
    public function tareasAsignadas(): BelongsToMany
    {
        return $this->belongsToMany(Tarea::class, 'perfiles_x_tareas')->withTimestamps();
    }

    /**
     * Los gastos que este perfil pagó.
     */
    public function gastos(): HasMany
    {
        return $this->hasMany(Gasto::class);
    }

    /**
     * Las deudas donde este perfil es el acreedor (puso la plata).
     */
    public function deudasComoAcreedor(): HasMany
    {
        return $this->hasMany(Deuda::class);
    }

    /**
     * Las deudas donde este perfil es el deudor.
     */
    public function deudasComoDeudor(): HasMany
    {
        return $this->hasMany(Deuda::class, 'deudor_id');
    }
}
