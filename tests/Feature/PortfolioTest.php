<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    public function test_home_page_renders(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Home'));
    }

    public function test_work_index_renders(): void
    {
        $this->get('/work')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Work'));
    }

    public function test_about_page_renders(): void
    {
        $this->get('/about')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('About'));
    }

    public function test_contact_page_renders(): void
    {
        $this->get('/contact')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Contact'));
    }

    public function test_each_project_page_renders(): void
    {
        foreach (['indo-cahaya-express', 'jembatan-armco', 'portofolio-2026'] as $slug) {
            $this->get("/work/{$slug}")
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component('Project')
                    ->where('slug', $slug));
        }
    }

    public function test_unknown_project_returns_not_found(): void
    {
        $this->get('/work/proyek-yang-tidak-ada')->assertNotFound();
    }

    public function test_sitemap_lists_every_project(): void
    {
        $response = $this->get('/sitemap.xml');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $response->assertSee('/work/indo-cahaya-express', false);
        $response->assertSee('/work/jembatan-armco', false);
        $response->assertSee('/work/portofolio-2026', false);
    }

    public function test_robots_file_points_to_the_sitemap(): void
    {
        $response = $this->get('/robots.txt');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
        $response->assertSee('Sitemap: '.url('/sitemap.xml'), false);
    }

    public function test_unknown_page_returns_custom_inertia_error(): void
    {
        $this->get('/halaman-tidak-ada')
            ->assertNotFound()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Error')
                ->where('status', 404));
    }
}
