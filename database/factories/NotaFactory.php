<?php

namespace Database\Factories;

use App\Models\Nota;
use App\Models\Perfil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Nota>
 */
class NotaFactory extends Factory
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
            'titulo' => fake()->optional()->sentence(3),
            'contenido' => fake()->paragraph(),
            'fijada' => false,
        ];
    }
}
