<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => ContactMessage::query()
                ->latest()
                ->paginate(20)
                ->withQueryString()
                ->through(fn (ContactMessage $m): array => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'email' => $m->email,
                    'company' => $m->company,
                    'project_type' => $m->project_type,
                    'budget' => $m->budget,
                    'message' => $m->message,
                    'read' => $m->read_at !== null,
                    'created_at' => $m->created_at?->toIso8601String(),
                ]),
        ]);
    }

    public function read(ContactMessage $message): RedirectResponse
    {
        $message->update(['read_at' => $message->read_at ?? now()]);

        return back();
    }

    public function unread(ContactMessage $message): RedirectResponse
    {
        $message->update(['read_at' => null]);

        return back();
    }

    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Pesan dihapus.');
    }
}
