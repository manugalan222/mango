<?php

namespace Database\Factories;

use App\Models\Perfil;
use App\Models\Tarea;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tarea>
 */
class TareaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'perfil_id' => Perfil::factory(),
            'titulo' => fake()->sentence(4),
            'descripcion' => fake()->optional()->paragraph(),
            'vence_el' => fake()->optional()->dateTimeBetween('now', '+1 month'),
            'completada_el' => null,
            'completada_por_id' => null,
        ];
    }

    /**
     * Tarea ya completada, por el mismo perfil creador salvo que se indique otro.
     */
    public function completada(): static
    {
        return $this->state(fn (array $attributes) => [
            'completada_el' => now(),
            'completada_por_id' => $attributes['perfil_id'] ?? Perfil::factory(),
        ]);
    }
}
