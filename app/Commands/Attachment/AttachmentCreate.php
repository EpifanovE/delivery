<?php

declare(strict_types=1);

namespace App\Commands\Attachment;

use App\Models\Attachment\Attachment;

class AttachmentCreate
{
    public function handle(array $data): Attachment
    {
        $file = $data['image'];

        /**
         * @var Attachment $attachment
         */
        $attachment = Attachment::create([
            "filename" => $file->getClientOriginalName(),
            "mime" => $file->getMimeType(),
            "is_private" => false,
        ]);

        $attachment->saveFile($file);

        return $attachment;
    }
}
