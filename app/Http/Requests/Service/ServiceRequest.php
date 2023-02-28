<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string',],
            'price' => ['required', 'string',],
            'is_active' => ['nullable', 'string',],
            'attributes' => ['nullable', 'array',],
            'description' => ['nullable', 'string',],
            'order_column' => ['nullable', 'string',],
            'image' => ['nullable',],
        ];
    }
}
