<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TelegramController;

Route::post("{token}", [TelegramController::class, 'handle']);
