<?php

namespace App\Models\Order;

enum Status: string
{
    case Pending = 'pending';
    case Process = 'process';
    case Cancel = 'cancel';
    case Done = 'done';
}
