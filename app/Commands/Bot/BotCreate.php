<?php

declare(strict_types=1);

namespace App\Commands\Bot;

use App\Commands\Attachment\AttachmentCreate;
use App\Models\Bot\Bot;
use Illuminate\Http\UploadedFile;

class BotCreate
{
    protected AttachmentCreate $attachmentCreate;

    public function __construct(AttachmentCreate $attachmentCreate)
    {
        $this->attachmentCreate = $attachmentCreate;
    }

    public function handle(array $data): Bot
    {
        if (!empty($data['settings']['image']) && $data['settings']['image'] instanceof UploadedFile) {
            $attachment = $this->attachmentCreate->handle($data['settings']);
            $data['settings']['image'] = $attachment->id;
        }

        $bot = Bot::create($data);

        return $bot;
    }
}
