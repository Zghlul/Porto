<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'company',
        'project_type',
        'budget',
        'message',
        'ip_address',
    ];
}
