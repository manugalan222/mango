<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Categorías globales de gasto, compartidas por todas las casas.
     */
    public function run(): void
    {
        collect(['Supermercado', 'Servicios', 'Alquiler', 'Transporte', 'Salidas', 'Otros'])
            ->each(fn (string $nombre) => Categoria::firstOrCreate(['nombre' => $nombre]));
    }
}
