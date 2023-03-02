<?php

declare(strict_types=1);

namespace App\Commands\Attachment;

use App\Contracts\HasImage;
use App\Models\Attachment\Attachment;

class AttachmentCreateByModel
{
    public function handle(HasImage $model, array $data): Attachment
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

        $model->image()->associate($attachment);
        $model->save();

        return $attachment;
    }
}
