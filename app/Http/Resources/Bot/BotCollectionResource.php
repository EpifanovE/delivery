<?php

declare(strict_types=1);

namespace App\Http\Resources\Bot;

use Illuminate\Http\Resources\Json\JsonResource;

class BotCollectionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
