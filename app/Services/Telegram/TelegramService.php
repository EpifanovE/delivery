<?php

declare(strict_types=1);

namespace App\Services\Telegram;

use App\Models\Bot\Bot;
use Telegram\Bot\Api;
use Telegram\Bot\Exceptions\TelegramSDKException;

class TelegramService
{
    /**
     * @param Bot $bot
     * @return void
     * @throws TelegramSDKException
     */
    public function setWebHook(Bot $bot): void
    {
        $telegram = new Api($bot->token);
        $response = $telegram->setWebhook([
            'url' => $bot->getWebHookUrl(),
        ]);
        $bot->update(['webhook' => true]);
    }

    /**
     * @param Bot $bot
     * @return void
     * @throws TelegramSDKException
     */
    public function removeWebHook(Bot $bot): void
    {
        $telegram = new Api($bot->token);
        $response = $telegram->removeWebhook();
        $bot->update(['webhook' => false]);
    }
}
