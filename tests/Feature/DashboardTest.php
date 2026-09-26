<?php

namespace Tests\Feature;

use App\Models\Perfil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_a_casa_without_a_perfil_chosen_is_sent_to_pick_one()
    {
        $this->actingAs(User::factory()->create());

        $this->get('/dashboard')->assertRedirect('/perfiles');
    }

    public function test_a_casa_with_a_perfil_chosen_can_visit_the_dashboard()
    {
        $casa = User::factory()->create();
        $perfil = Perfil::factory()->for($casa)->create();

        $this->actingAs($casa)
            ->withSession(['perfil_id' => $perfil->id])
            ->get('/dashboard')
            ->assertOk();
    }

    public function test_a_perfil_from_another_casa_does_not_count()
    {
        $casa = User::factory()->create();
        $ajeno = Perfil::factory()->create();

        $this->actingAs($casa)
            ->withSession(['perfil_id' => $ajeno->id])
            ->get('/dashboard')
            ->assertRedirect('/perfiles');
    }
}
