<?php

namespace App\Http\Controllers;

use App\Commands\Bot\BotCreate;
use App\Commands\Bot\BotUpdate;
use App\Http\Requests\Bot\BotRequest;
use App\Http\Requests\IndexRequest;
use App\Http\Resources\Bot\BotCollectionResource;
use App\Http\Resources\Bot\BotResource;
use App\Models\Bot\Bot;
use App\Services\Telegram\TelegramService;
use Inertia\Inertia;

class BotController extends Controller
{
    private TelegramService $telegramService;

    private BotUpdate $botUpdateCommand;

    private BotCreate $botCreateCommand;

    public function __construct(TelegramService $telegramService, BotUpdate $botUpdateCommand, BotCreate $botCreateCommand)
    {
        $this->telegramService = $telegramService;
        $this->botUpdateCommand = $botUpdateCommand;
        $this->botCreateCommand = $botCreateCommand;
    }

    public function index(IndexRequest $request)
    {
        $query = Bot::query();

        if (!empty($request->get('s'))) {
            $query->search($request->get('s'));
        }

        if (!empty($request->get('orderBy'))) {
            $query->orderBy($request->get('orderBy'), $request->get('order', 'asc'));
        }

        return Inertia::render('Bots/Index', [
            'items' => BotCollectionResource::collection($query->paginate($request->get('per_page', 10))->withQueryString()->onEachSide(2)),
        ]);
    }

    public function create()
    {
        return Inertia::render('Bots/Edit', [
            'types' => array_keys(config('telegram.bot_types')),
        ]);
    }

    public function store(BotRequest $request)
    {
        $bot = $this->botCreateCommand->handle($request->validated());
        return redirect()->route('bots.edit', ['bot' => $bot])->with(['message' => __('messages.saved')]);
    }

    public function edit(Bot $bot)
    {
        return Inertia::render('Bots/Edit', [
            'item' => new BotResource($bot),
            'types' => array_keys(config('telegram.bot_types')),
        ]);
    }

    public function update(BotRequest $request, Bot $bot)
    {
        $this->botUpdateCommand->handle($bot, $request->validated());
        return redirect()->back()->with(['message' => __('messages.saved')]);
    }

    public function destroy(Bot $bot)
    {
        $bot->delete();
        return redirect()->back()->with(['message' => __('messages.deleted')]);
    }

    public function setWebHook(Bot $bot)
    {
        $this->telegramService->setWebHook($bot);
        return redirect()->back()->with(['message' => __('messages.webhook_set')]);
    }

    public function removeWebHook(Bot $bot)
    {
        $this->telegramService->removeWebHook($bot);
        return redirect()->back()->with(['message' => __('messages.webhook_removed')]);
    }

    public function setCommands(Bot $bot)
    {
        $this->telegramService->setCommands($bot);
        return redirect()->back()->with(['message' => __('messages.commands_set')]);
    }
}
