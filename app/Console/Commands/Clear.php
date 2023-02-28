<?php

namespace App\Console\Commands;

use App\Commands\User\UserCreate;
use App\Models\LogEvent\LogEvent;
use Carbon\Carbon;
use Illuminate\Console\Command;

class Clear extends Command
{
    protected $signature = 'app:clear {days?}';

    protected $description = 'Clear analytics';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $days = $this->argument('days');

        $query = LogEvent::query();

        if (!empty($days)) {
            $date = Carbon::now()->subDays($days);
            $query->whereDate('created_at', '<', $date);
        }

        if ($this->confirm('Вы уверены, что хотите очистить данные?')) {
            $query->delete();
            $this->info('Аналитика успешно очищена.');
        } else {
            $this->error('Операция прервана.');
        }
    }
}
