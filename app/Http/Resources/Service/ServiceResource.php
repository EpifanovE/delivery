<?php

declare(strict_types=1);

namespace App\Http\Resources\Service;

use App\Http\Resources\Attachment\AttachmentThumbResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'is_active' => $this->is_active,
            'attributes' => $this->attributes,
            'description' => $this->description,
            'image' => !empty($this->image) ? new AttachmentThumbResource($this->image) : null,
            'order_column' => $this->order_column,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
