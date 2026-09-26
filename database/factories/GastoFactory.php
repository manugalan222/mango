<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Gasto;
use App\Models\Perfil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Gasto>
 */
class GastoFactory extends Factory
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
            'categoria_id' => Categoria::factory(),
            'descripcion' => fake()->sentence(3),
            'monto' => fake()->randomFloat(2, 1, 50000),
            'fecha' => fake()->dateTimeBetween('-2 months', 'now'),
        ];
    }
}
