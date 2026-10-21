<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create();
    }

    public function test_guests_are_sent_to_login(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_login_screen_renders(): void
    {
        $this->get('/admin/login')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Login'));
    }

    public function test_dashboard_renders_for_admin(): void
    {
        $this->actingAs($this->admin())
            ->get('/admin')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Dashboard')
                ->has('stats')
                ->has('projects'));
    }

    public function test_admin_can_create_a_project(): void
    {
        $this->actingAs($this->admin())
            ->post('/admin/karya', [
                'title' => 'Kedai Kopi Senja',
                'kind' => 'Identitas merek',
                'year' => '2026',
                'cover' => 'karta',
                'background' => '#101010',
                'foreground' => '#F2F1EB',
                'accent' => '#FF4B3E',
                'stack' => 'Laravel, Figma',
                'approach' => [['title' => 'Riset', 'body' => 'Wawancara enam pemilik kedai.']],
            ])
            ->assertRedirect();

        $project = Project::firstWhere('slug', 'kedai-kopi-senja');

        $this->assertNotNull($project);
        $this->assertSame(['Laravel', 'Figma'], $project->stack);
        $this->assertSame('01', $project->approach[0]['number']);
    }

    public function test_slug_regenerates_when_asked(): void
    {
        $this->actingAs($this->admin());

        $project = Project::create([
            'slug' => 'judul-lama',
            'title' => 'Judul lama',
            'cover' => 'karta',
            'stack' => [],
            'overview' => [],
            'problem' => [],
            'approach' => [],
            'outcome' => [],
        ]);

        $this->put("/admin/karya/{$project->id}", [
            'title' => 'Judul baru',
            'cover' => 'karta',
            'background' => '#101010',
            'foreground' => '#F2F1EB',
            'accent' => '#FF4B3E',
            'regenerate_slug' => true,
        ])->assertRedirect();

        $this->assertSame('judul-baru', $project->fresh()->slug);
    }

    public function test_publish_writes_the_json_the_site_reads(): void
    {
        $path = resource_path('data/portfolio.json');
        $before = (string) file_get_contents($path);

        $this->actingAs($this->admin());

        Project::create([
            'slug' => 'karya-uji-terbit',
            'order' => 99,
            'title' => 'Karya uji terbit',
            'cover' => 'karta',
            'stack' => [],
            'overview' => [],
            'problem' => [],
            'approach' => [],
            'outcome' => [],
        ]);

        // Export only; the npm build is covered by the manual check, not the suite.
        $this->assertSame(1, \App\Support\PortfolioSync::exportJson());

        $decoded = json_decode((string) file_get_contents($path), true);
        $slugs = array_column($decoded['projects'], 'slug');

        $this->assertContains('karya-uji-terbit', $slugs);
        $this->assertNotEmpty($decoded['site']['name']);

        file_put_contents($path, $before);
        \App\Support\Portfolio::flush();
    }

    public function test_message_can_be_marked_read(): void
    {
        $message = ContactMessage::create([
            'name' => 'Rani',
            'email' => 'rani@example.com',
            'project_type' => 'Website',
            'message' => 'Butuh situs untuk toko kue.',
        ]);

        $this->assertNull($message->read_at);

        $this->actingAs($this->admin())
            ->patch("/admin/pesan/{$message->id}/dibaca")
            ->assertRedirect();

        $this->assertNotNull($message->fresh()->read_at);
    }
}
