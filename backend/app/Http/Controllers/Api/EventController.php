<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'zipcode' => 'required|string|max:10',
            'prefecture' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'town' => 'required|string|max:255',
            'participants' => 'required|integer',
            'age' => 'required|integer',
            'gender' => 'required|string|in:male,female',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'remarks' => 'nullable|string|max:1000'
        ]);

        $eventData = $request->all();

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
            $eventData['photo'] = $photoPath;
        }

        $event = Event::create($eventData);

        return response()->json(['message' => 'Event created successfully', 'event' => $event], 201);
    }
}


