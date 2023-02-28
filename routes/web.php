<?php

use App\Http\Controllers\BotController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LangController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebApp\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return '';
});

Route::get('webapp/{bot}', [HomeController::class, 'view'])->name('webapp.home');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::match(['get', 'post'],'/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('subscribers/{subscriber}/block', [SubscriberController::class, 'block'])->name('subscribers.block');
    Route::resource('subscribers', SubscriberController::class)->except(['show', 'create', 'store', 'update']);

    Route::post('bots/{bot}/setWebHook', [BotController::class, 'setWebHook'])->name('bots.setWebHook');
    Route::post('bots/{bot}/removeWebHook', [BotController::class, 'removeWebHook'])->name('bots.removeWebHook');
    Route::resource('bots', BotController::class)->except('show');

    Route::resource('users', UserController::class)->except('show');

    Route::resource('services', ServiceController::class)->except('show');
});

Route::get('/lang/{langCode}/translation.json', [LangController::class, 'view'])->name('translation');

require __DIR__.'/auth.php';
