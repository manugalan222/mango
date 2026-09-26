<?php

namespace Database\Factories;

use App\Models\Deuda;
use App\Models\Perfil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Deuda>
 */
class DeudaFactory extends Factory
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
            'deudor_id' => Perfil::factory(),
            'gasto_id' => null,
            'concepto' => fake()->sentence(3),
            'monto' => fake()->randomFloat(2, 1, 50000),
            'saldada_el' => null,
        ];
    }

    /**
     * Deuda ya saldada.
     */
    public function saldada(): static
    {
        return $this->state(fn () => ['saldada_el' => now()]);
    }
}
