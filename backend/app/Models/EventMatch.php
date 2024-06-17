<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id', 'like_id'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function like()
    {
        return $this->belongsTo(Like::class);
    }
}
