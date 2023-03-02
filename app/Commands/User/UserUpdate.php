<?php

declare(strict_types=1);

namespace App\Commands\User;

use App\Models\User\User;
use Illuminate\Support\Facades\Hash;

class UserUpdate
{
    public function handle(User $user, array $data): User
    {
        if (!empty($data["password"])) {
            $data["password"] = Hash::make($data["password"]);
        } else {
            unset($data['password']);
        }

        $user->fill($data);
        $user->save();

        return $user;
    }
}
