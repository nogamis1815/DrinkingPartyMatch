<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\EventController;

// 郵便番号から住所取得用
Route::get('/address', [AddressController::class, 'getAddress']);
// 各イベント用
Route::post('/events', [EventController::class, 'store']);
