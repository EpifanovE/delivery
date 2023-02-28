<?php

declare(strict_types=1);

namespace App\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

interface HasImage
{
    public function image(): BelongsTo;
}
