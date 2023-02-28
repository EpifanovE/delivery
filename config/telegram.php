<?php

use App\Services\Telegram\BotTypes\DeliveryType\DeliveryType;

return [
    'host' => env('TELEGRAM_HOST', env('APP_NAME')),
    'bot_types' => [
        'delivery' => DeliveryType::class,
    ],
];
