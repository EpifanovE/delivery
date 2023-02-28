<?php

namespace App\Console\Commands;

use App\Commands\User\UserCreate;
use Illuminate\Console\Command;

class Init extends Command
{
    protected $signature = 'app:init {email} {name} {password?}';

    protected $description = 'App initialization';

    private UserCreate $createCommand;

    public function __construct(UserCreate $createCommand)
    {
        parent::__construct();
        $this->createCommand = $createCommand;
    }

    public function handle()
    {
        $this->createCommand->handle([
            'name' => $this->argument('name'),
            'email' => $this->argument('email'),
            'password' => !empty($this->argument('password')) ? $this->argument('password') : '12345678',
            'is_super' => true,
        ]);
    }
}
