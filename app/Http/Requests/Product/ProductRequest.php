<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
