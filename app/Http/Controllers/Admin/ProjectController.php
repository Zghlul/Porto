<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::query()
                ->orderBy('order')
                ->orderBy('id')
                ->get(['id', 'slug', 'title', 'kind', 'year', 'order', 'published', 'cover', 'accent', 'updated_at']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => null,
            'covers' => Project::COVERS,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = Project::uniqueSlug($data['title']);

        $project = Project::create($data);

        return redirect()
            ->route('admin.projects.edit', $project)
            ->with('success', 'Karya dibuat. Isi detailnya, lalu tekan Terbitkan.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'covers' => Project::COVERS,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->boolean('regenerate_slug')) {
            $data['slug'] = Project::uniqueSlug($data['title'], $project->id);
        }

        $project->update($data);

        return back()->with('success', 'Perubahan disimpan.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Karya dihapus dari dashboard.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'kind' => ['nullable', 'string', 'max:120'],
            'client' => ['nullable', 'string', 'max:120'],
            'year' => ['nullable', 'string', 'max:12'],
            'role' => ['nullable', 'string', 'max:160'],
            'duration' => ['nullable', 'string', 'max:120'],
            'team' => ['nullable', 'string', 'max:160'],
            'scope' => ['nullable', 'string', 'max:255'],
            'external' => ['nullable', 'url', 'max:255'],
            'summary' => ['nullable', 'string', 'max:600'],
            'card_line' => ['nullable', 'string', 'max:255'],
            'cover' => ['required', Rule::in(Project::COVERS)],
            'cover_alt' => ['nullable', 'string', 'max:255'],
            'background' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'foreground' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'accent' => ['required', 'regex:/^#[0-9a-fA-F]{6}$/'],
            'order' => ['nullable', 'integer', 'min:0', 'max:999'],
            'published' => ['boolean'],
            'stack' => ['nullable', 'string', 'max:400'],
            'overview' => ['nullable', 'string', 'max:6000'],
            'problem_heading' => ['nullable', 'string', 'max:200'],
            'problem_body' => ['nullable', 'string', 'max:4000'],
            'reflection' => ['nullable', 'string', 'max:2000'],
            'next_slug' => ['nullable', 'string', 'max:80'],
            'approach' => ['nullable', 'array', 'max:12'],
            'approach.*.title' => ['nullable', 'string', 'max:160'],
            'approach.*.body' => ['nullable', 'string', 'max:1500'],
            'outcome_title' => ['nullable', 'string', 'max:200'],
            'outcome_body' => ['nullable', 'string', 'max:3000'],
        ]);

        $lines = fn (?string $value): array => array_values(array_filter(
            array_map('trim', preg_split('/\R{2,}/', (string) $value) ?: []),
            fn (string $line): bool => $line !== ''
        ));

        return [
            'title' => $validated['title'],
            'kind' => $validated['kind'] ?? '',
            'client' => $validated['client'] ?? '',
            'year' => $validated['year'] ?? '',
            'role' => $validated['role'] ?? '',
            'duration' => $validated['duration'] ?? '',
            'team' => $validated['team'] ?? '',
            'scope' => $validated['scope'] ?? '',
            'external' => $validated['external'] ?? null,
            'summary' => $validated['summary'] ?? '',
            'card_line' => $validated['card_line'] ?? '',
            'cover' => $validated['cover'],
            'cover_alt' => $validated['cover_alt'] ?? '',
            'background' => $validated['background'],
            'foreground' => $validated['foreground'],
            'accent' => $validated['accent'],
            'order' => (int) ($validated['order'] ?? 0),
            'published' => $request->boolean('published'),
            'stack' => array_values(array_filter(array_map('trim', explode(',', (string) ($validated['stack'] ?? ''))))),
            'overview' => $lines($validated['overview'] ?? null),
            'problem' => [
                'heading' => $validated['problem_heading'] ?? '',
                'body' => $lines($validated['problem_body'] ?? null),
            ],
            'approach' => array_values(array_map(
                fn (array $step, int $i): array => [
                    'number' => str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT),
                    'title' => $step['title'] ?? '',
                    'body' => $step['body'] ?? '',
                ],
                $validated['approach'] ?? [],
                array_keys($validated['approach'] ?? []),
            )),
            'outcome' => [
                'title' => $validated['outcome_title'] ?? '',
                'body' => $validated['outcome_body'] ?? '',
            ],
            'reflection' => $validated['reflection'] ?? '',
            'next_slug' => ($validated['next_slug'] ?? null) ?: null,
        ];
    }
}
