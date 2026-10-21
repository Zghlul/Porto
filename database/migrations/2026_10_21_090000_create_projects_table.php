<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 80)->unique();
            $table->unsignedSmallInteger('order')->default(0);
            $table->boolean('published')->default(true);
            $table->string('title', 120);
            $table->string('kind', 120)->default('');
            $table->string('client', 120)->default('');
            $table->string('year', 12)->default('');
            $table->string('role', 160)->default('');
            $table->string('duration', 120)->default('');
            $table->string('team', 160)->default('');
            $table->string('scope', 255)->default('');
            $table->json('stack');
            $table->string('external', 255)->nullable();
            $table->text('summary')->default('');
            $table->string('card_line', 255)->default('');
            $table->string('cover', 40)->default('karta');
            $table->string('cover_alt', 255)->default('');
            $table->string('background', 9)->default('#08101F');
            $table->string('foreground', 9)->default('#F2F1EB');
            $table->string('accent', 9)->default('#FF4B3E');
            $table->json('overview');
            $table->json('problem');
            $table->json('approach');
            $table->json('outcome');
            $table->text('reflection')->default('');
            $table->string('next_slug', 80)->nullable();
            $table->timestamps();

            $table->index(['published', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
