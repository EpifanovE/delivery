<?php

namespace App\Http\Requests\Order;

use App\Models\Order\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class OrderCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'total' => ['required', 'integer',],
            'product_id' => ['nullable', 'integer',],
            'subscriber_id' => ['nullable', 'integer',],
            'bot_id' => ['nullable', 'integer',],
            'details' => ['nullable', 'array',],
            'status' => ['required', new Enum(Status::class),],
            'notes' => ['nullable', 'string',],
        ];
    }
}
