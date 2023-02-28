<?php

declare(strict_types=1);

namespace App\Commands\User;

use App\Models\User\User;
use Illuminate\Support\Facades\Hash;

class UserCreate
{
    public function handle(array $data): User
    {
        $data["password"] = Hash::make($data["password"]);

        $user = User::create($data);
        $user->markEmailAsVerified();

        return $user;
    }
}
