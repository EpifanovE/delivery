<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DashboardRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'from' => ['nullable', 'string',],
            'to' => ['nullable', 'string',],
            'detailing' => ['nullable', 'string',],
        ];
    }
}
