<?php

namespace App\Models\User;

 use Illuminate\Contracts\Auth\MustVerifyEmail;
 use Illuminate\Database\Eloquent\Builder;
 use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

 /**
  * @method static User create(array $data)
  */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_super',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_super' => 'boolean',
    ];

    public function isSuper(): bool
    {
        return $this->is_super;
    }

    public function isDemoUser(): bool
    {
        if (!config('app.demo')) {
            return false;
        }

        return !$this->isSuper();
    }

    public function scopeSearch(Builder $query, string $search)
    {
        $query
            ->where('id', $search)
            ->orWhere('name', 'like', '%' . $search . '%')
            ->orWhere('email','like', '%' . $search . '%');
    }
}
