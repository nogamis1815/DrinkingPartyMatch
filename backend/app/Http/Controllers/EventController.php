<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'prefecture' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'gender' => 'required|string|in:male,female',
            'participants' => 'required|integer',
            'age' => 'required|integer',
        ]);

        $event = Event::create([
            'prefecture' => $request->prefecture,
            'region' => $request->region,
            'gender' => $request->gender,
            'participants' => $request->participants,
            'age' => $request->age,
        ]);

        return response()->json($event, 201);
    }
}
