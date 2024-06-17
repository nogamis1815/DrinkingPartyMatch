<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id', 'message', 'photo_url', 'gender', 'participants'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
