<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'zipcode', 'prefecture', 'city', 'town', 'participants', 'age', 'gender'
    ];

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function matches()
    {
        return $this->hasMany(EventMatch::class);
    }
}
