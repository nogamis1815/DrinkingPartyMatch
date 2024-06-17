<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AddressController;

Route::get('/address', [AddressController::class, 'getAddress']);
