<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deudas', function (Blueprint $table) {
            $table->id();
            // Acreedor: quien puso la plata.
            $table->foreignId('perfil_id')->constrained('perfiles')->restrictOnDelete();
            $table->foreignId('deudor_id')->constrained('perfiles')->restrictOnDelete();
            $table->foreignId('gasto_id')->nullable()->constrained('gastos')->nullOnDelete();
            $table->string('concepto', 150);
            $table->decimal('monto', 12, 2);
            $table->timestamp('saldada_el')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deudas');
    }
};
