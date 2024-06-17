<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        // 全てのイベントを取得
        $events = Event::all();
        return response()->json($events);
    }

    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'zipcode' => 'required|string|max:10',
            'prefecture' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'town' => 'required|string|max:255',
            'participants' => 'required|integer',
            'age' => 'required|integer',
            'gender' => 'required|string|in:male,female,other',
        ]);

        $event = Event::create($request->all());

        return response()->json(['message' => 'Event created successfully', 'event' => $event], 201);
    }
}

