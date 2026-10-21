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
