<?php

use App\Services\Telegram\BotTypes\DeliveryType\DeliveryType;

return [
    'host' => env('TELEGRAM_HOST', env('APP_NAME')),
    'enable_analytics' => env('ENABLE_ANALYTICS', false),
    'bot_types' => [
        'delivery' => DeliveryType::class,
    ],
];
