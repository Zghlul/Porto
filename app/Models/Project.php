<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'slug', 'order', 'published', 'title', 'kind', 'client', 'year', 'role',
        'duration', 'team', 'scope', 'stack', 'external', 'summary', 'card_line',
        'cover', 'cover_alt', 'background', 'foreground', 'accent', 'overview',
        'problem', 'approach', 'outcome', 'reflection', 'next_slug',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published' => 'boolean',
            'order' => 'integer',
            'stack' => 'array',
            'overview' => 'array',
            'problem' => 'array',
            'approach' => 'array',
            'outcome' => 'array',
        ];
    }

    /**
     * Cover scenes available in the public bundle (ProjectCover.jsx).
     *
     * @var list<string>
     */
    public const COVERS = ['karta', 'motion', 'portfolio'];

    public static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'karya';
        $slug = $base;
        $i = 2;

        while (static::query()->where('slug', $slug)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}
