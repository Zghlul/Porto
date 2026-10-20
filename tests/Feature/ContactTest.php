<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Ayu Prameswari',
            'email' => 'ayu@example.com',
            'project_type' => 'Website / sistem web',
            'budget' => 'Rp3–7 juta',
            'message' => 'Saya ingin membangun sistem operasional sederhana untuk tim kecil.',
            'website' => '',
        ], $overrides);
    }

    public function test_a_valid_message_is_stored(): void
    {
        $response = $this->from('/contact')->post('/contact', $this->validPayload());

        $response->assertRedirect('/contact');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Ayu Prameswari',
            'email' => 'ayu@example.com',
            'project_type' => 'Website / sistem web',
        ]);
    }

    public function test_required_fields_are_validated(): void
    {
        $this->from('/contact')
            ->post('/contact', [])
            ->assertSessionHasErrors(['name', 'email', 'project_type', 'message']);

        $this->assertDatabaseCount('contact_messages', 0);
    }

    public function test_email_must_be_valid(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validPayload(['email' => 'bukan-email']))
            ->assertSessionHasErrors('email');

        $this->assertDatabaseCount('contact_messages', 0);
    }

    public function test_the_honeypot_silently_rejects_bots(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validPayload(['website' => 'https://spam.example']))
            ->assertRedirect('/contact')
            ->assertSessionMissing('success');

        $this->assertDatabaseCount('contact_messages', 0);
    }

    public function test_messages_are_limited_to_a_reasonable_length(): void
    {
        $this->from('/contact')
            ->post('/contact', $this->validPayload(['message' => str_repeat('a', 4001)]))
            ->assertSessionHasErrors('message');

        $this->assertDatabaseCount('contact_messages', 0);
    }

    public function test_a_stored_message_belongs_to_the_contact_model(): void
    {
        $this->from('/contact')->post('/contact', $this->validPayload());

        $this->assertInstanceOf(ContactMessage::class, ContactMessage::first());
    }
}
