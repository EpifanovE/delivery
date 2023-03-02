<?php

declare(strict_types=1);

namespace App\Commands\Bot;

use App\Commands\Attachment\AttachmentCreate;
use App\Models\Attachment\Attachment;
use App\Models\Bot\Bot;
use Illuminate\Http\UploadedFile;

class BotUpdate
{
    protected AttachmentCreate $attachmentCreate;

    public function __construct(AttachmentCreate $attachmentCreate)
    {
        $this->attachmentCreate = $attachmentCreate;
    }

    public function handle(Bot $bot, array $data): Bot
    {

        if (!empty($data['settings']['image']) && $data['settings']['image'] instanceof UploadedFile) {
            if (!empty($bot->settings['image'])) {
                $this->clearAttachment($bot);
            }

            $attachment = $this->attachmentCreate->handle($data['settings']);
            $data['settings']['image'] = $attachment->id;

        } elseif (empty($data['settings']['image']) && !empty($bot->settings['image'])) {
            $data['settings']['image'] = null;
            $this->clearAttachment($bot);
        } elseif (!empty($bot->settings['image'])) {
            $data['settings']['image'] = $bot->settings['image'];
        }

        $bot->fill($data);
        $bot->save();
        $bot->refresh();

        return $bot;
    }

    private function clearAttachment(Bot $bot)
    {
        $attachment = Attachment::where('id', $bot->settings['image'])->first();
        $attachment->delete();
    }
}
