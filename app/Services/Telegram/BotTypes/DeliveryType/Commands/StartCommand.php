<?php

declare(strict_types=1);

namespace App\Services\Telegram\BotTypes\DeliveryType\Commands;

use App\Models\Attachment\Attachment;
use App\Models\Bot\Command;
use Telegram\Bot\FileUpload\InputFile;

class StartCommand extends Command
{
    protected $name = "start";

    public function handle()
    {
        $message = $this->botType->getBot()->settings['start_message'] ?? null;
        $attachmentId = $this->botType->getBot()->settings['image'] ?? null;

        if (empty($message)) {
            $this->replyWithMessage([
                'text' => __('bot.hello_message'),
                'parse_mode' => 'html',
            ]);

            return;
        }

        if (!empty($attachmentId)) {
            $attachment = Attachment::where('id', $attachmentId)->first();

            if (!empty($attachment)) {
                $file = InputFile::create($attachment->getPath(), $attachment->filename);

                $this->replyWithPhoto([
                    'photo' => $file,
                    'caption' => $message,
                    'parse_mode' => 'html',
                ]);

                return;
            }
        }

        $this->replyWithMessage([
            'text' => $message,
            'parse_mode' => 'html',
        ]);
    }
}
