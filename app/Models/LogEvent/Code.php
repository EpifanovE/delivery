<?php

declare(strict_types=1);

namespace App\Models\LogEvent;

enum Code: int
{
    case Visit = 1;
    case Start = 2;
}
