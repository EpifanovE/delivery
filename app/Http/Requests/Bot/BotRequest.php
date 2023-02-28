<?php

namespace App\Http\Requests\Bot;

use Illuminate\Foundation\Http\FormRequest;

class BotRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string',],
            'type' => ['required', 'string',],
            'token' => ['required', 'string',],
            'settings' => ['nullable', 'array',],
        ];
    }
}
