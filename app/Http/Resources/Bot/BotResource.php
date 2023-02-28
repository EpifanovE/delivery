<?php

declare(strict_types=1);

namespace App\Http\Resources\Bot;

use App\Models\Attachment\Attachment;
use Illuminate\Http\Resources\Json\JsonResource;

class BotResource extends JsonResource
{
    public function toArray($request)
    {
        $settings = $this->settings ?? [];

        $attachmentId = $this->settings['image'] ?? null;
        $imageUrl = null;

        if (!empty($attachmentId)) {
            $attachment = Attachment::where('id', $attachmentId)->first();

            if (!empty($attachment)) {
                $imageUrl = $attachment->getPublicUrl();
                $settings['image'] = $attachment->getThumbUrl();
            }

        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'token' => $this->token,
            'webhook' => $this->webhook,
            'settings' => $settings,
            'image_url' => $imageUrl,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
