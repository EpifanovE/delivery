<?php

declare(strict_types=1);

namespace App\Http\Resources\Attachment;

use Illuminate\Http\Resources\Json\JsonResource;

class AttachmentThumbResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'url' => $this->getThumbUrl(),
            'full_url' => $this->getPublicUrl(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
