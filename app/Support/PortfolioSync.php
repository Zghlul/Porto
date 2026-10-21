<?php

namespace App\Support;

use App\Models\Project;

final class PortfolioSync
{
    /**
     * Import every project found in resources/data/portfolio.json into the
     * database, keeping slugs so existing URLs stay valid.
     *
     * @return int number of projects imported
     */
    public static function importJson(): int
    {
        $path = resource_path('data/portfolio.json');

        if (! is_file($path)) {
            return 0;
        }

        $decoded = json_decode((string) file_get_contents($path), true);
        $imported = 0;

        foreach ($decoded['projects'] ?? [] as $project) {
            $attributes = [
                'order' => $project['order'] ?? $imported + 1,
                'published' => true,
                'title' => $project['title'] ?? 'Tanpa judul',
                'kind' => $project['kind'] ?? '',
                'client' => $project['client'] ?? '',
                'year' => (string) ($project['year'] ?? ''),
                'role' => $project['role'] ?? '',
                'duration' => $project['duration'] ?? '',
                'team' => $project['team'] ?? '',
                'scope' => $project['scope'] ?? '',
                'stack' => $project['stack'] ?? [],
                'external' => $project['external'] ?? null,
                'summary' => $project['summary'] ?? '',
                'card_line' => $project['cardLine'] ?? '',
                'cover' => $project['cover'] ?? 'karta',
                'cover_alt' => $project['coverAlt'] ?? '',
                'background' => $project['background'] ?? '#08101F',
                'foreground' => $project['foreground'] ?? '#F2F1EB',
                'accent' => $project['accent'] ?? '#FF4B3E',
                'overview' => $project['overview'] ?? [],
                'problem' => $project['problem'] ?? [],
                'approach' => $project['approach'] ?? [],
                'outcome' => $project['outcome'] ?? [],
                'reflection' => $project['reflection'] ?? '',
                'next_slug' => $project['nextSlug'] ?? null,
            ];

            Project::updateOrCreate(['slug' => $project['slug'] ?? 'karya'], $attributes);
            $imported++;
        }

        return $imported;
    }

    /**
     * Write every published project back into the content file the public
     * bundle imports. Run `npm run build` afterwards to ship the change.
     *
     * @return int number of projects exported
     */
    public static function exportJson(): int
    {
        $path = resource_path('data/portfolio.json');
        $content = is_file($path)
            ? (json_decode((string) file_get_contents($path), true) ?: [])
            : [];

        $projects = Project::query()
            ->where('published', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get()
            ->map(fn (Project $p): array => [
                'slug' => $p->slug,
                'order' => $p->order,
                'title' => $p->title,
                'kind' => $p->kind,
                'client' => $p->client,
                'year' => $p->year,
                'role' => $p->role,
                'duration' => $p->duration,
                'team' => $p->team,
                'scope' => $p->scope,
                'stack' => array_values($p->stack ?? []),
                'external' => $p->external,
                'summary' => $p->summary,
                'cardLine' => $p->card_line,
                'cover' => $p->cover,
                'coverAlt' => $p->cover_alt,
                'background' => $p->background,
                'foreground' => $p->foreground,
                'accent' => $p->accent,
                'overview' => array_values($p->overview ?? []),
                'problem' => $p->problem,
                'approach' => array_values($p->approach ?? []),
                'outcome' => $p->outcome,
                'reflection' => $p->reflection,
                'nextSlug' => $p->next_slug,
            ])
            ->all();

        $content['projects'] = $projects;

        file_put_contents(
            $path,
            json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)."\n"
        );

        Portfolio::flush();

        return count($projects);
    }
}
