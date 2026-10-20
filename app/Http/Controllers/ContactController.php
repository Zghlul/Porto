<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Support\Portfolio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        // A simple honeypot. Real people never see this field.
        if ($request->filled('website')) {
            return back();
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:80'],
            'email' => ['required', 'string', 'email', 'max:120'],
            'company' => ['nullable', 'string', 'max:120'],
            'project_type' => ['required', 'string', 'max:80'],
            'budget' => ['nullable', 'string', 'max:40'],
            'message' => ['required', 'string', 'min:20', 'max:4000'],
        ], [
            'name.required' => 'Nama perlu diisi.',
            'name.max' => 'Nama maksimal 80 karakter.',
            'email.required' => 'Email perlu diisi.',
            'email.email' => 'Alamat email belum valid.',
            'project_type.required' => 'Pilih jenis proyek yang paling dekat.',
            'message.required' => 'Ceritakan sedikit tentang proyeknya.',
            'message.min' => 'Tulis minimal 20 karakter agar saya bisa memahami konteksnya.',
            'message.max' => 'Pesan maksimal 4.000 karakter.',
        ]);

        $message = ContactMessage::create([
            ...$validated,
            'ip_address' => $request->ip(),
        ]);

        $this->notify($message);

        return back()->with(
            'success',
            "Terima kasih, {$message->name}. Pesan Anda sudah masuk. Saya akan membalas dalam 1–2 hari."
        );
    }

    private function notify(ContactMessage $message): void
    {
        $body = implode("\n", [
            'Pesan baru dari situs portofolio.',
            '',
            "Nama: {$message->name}",
            "Email: {$message->email}",
            'Perusahaan: '.($message->company ?: '—'),
            "Jenis proyek: {$message->project_type}",
            'Budget: '.($message->budget ?: '—'),
            '',
            $message->message,
        ]);

        try {
            Mail::raw($body, function ($mail) use ($message): void {
                $mail
                    ->to(Portfolio::email())
                    ->replyTo($message->email, $message->name)
                    ->subject("Pesan proyek baru dari {$message->name}");
            });
        } catch (Throwable $exception) {
            // A failed notification shouldn't lose the enquiry. It is already
            // stored in the database and can be read from there.
            Log::error('Could not send contact notification.', [
                'contact_message_id' => $message->id,
                'exception' => $exception->getMessage(),
            ]);
        }
    }
}
