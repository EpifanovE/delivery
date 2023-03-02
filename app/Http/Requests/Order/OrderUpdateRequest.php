<?php

namespace App\Http\Requests\Order;

use App\Models\Order\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class OrderUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'status' => ['required', new Enum(Status::class),],
            'notes' => ['nullable', 'string',],
        ];
    }
}
