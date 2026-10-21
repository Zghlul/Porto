<?php

namespace App\Support;

use RuntimeException;

final class Portfolio
{
    /**
     * The decoded content file, kept in memory for the life of the request.
     *
     * @var array<string, mixed>|null
     */
    private static ?array $content = null;

    /**
     * @return array<string, mixed>
     */
    public static function content(): array
    {
        if (self::$content !== null) {
            return self::$content;
        }

        $path = resource_path('data/portfolio.json');

        if (! is_file($path)) {
            throw new RuntimeException('The portfolio content file is missing.');
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        if (! is_array($decoded)) {
            throw new RuntimeException('The portfolio content file contains invalid JSON.');
        }

        return self::$content = $decoded;
    }

    /**
     * Drop the cached copy so the next read hits disk again.
     */
    public static function flush(): void
    {
        self::$content = null;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public static function projects(): array
    {
        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('projects')) {
                $dbProjects = \App\Models\Project::query()
                    ->where('published', true)
                    ->orderBy('order')
                    ->orderBy('id')
                    ->get();

                if ($dbProjects->isNotEmpty()) {
                    return $dbProjects->map(fn (\App\Models\Project $p): array => [
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
                    ])->all();
                }
            }
        } catch (\Throwable) {
            // fallback to file
        }

        $projects = self::content()['projects'] ?? [];

        usort($projects, fn (array $a, array $b): int => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));

        return $projects;
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function project(string $slug): ?array
    {
        foreach (self::projects() as $project) {
            if (($project['slug'] ?? null) === $slug) {
                return $project;
            }
        }

        return null;
    }

    /**
     * @return array<string, mixed>
     */
    public static function site(): array
    {
        return self::content()['site'] ?? [];
    }

    public static function email(): string
    {
        return (string) (self::site()['email'] ?? config('mail.from.address'));
    }
}
