<?php

namespace App\Http\Controllers;

use App\Commands\User\UserCreate;
use App\Commands\User\UserUpdate;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\User\UserCreateRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    private UserCreate $createCommand;

    private UserUpdate $updateCommand;

    public function __construct(UserCreate $createCommand, UserUpdate $updateCommand)
    {
        $this->createCommand = $createCommand;
        $this->updateCommand = $updateCommand;
    }

    public function index(IndexRequest $request)
    {
        if (! Gate::allows('manage-users')) {
            abort(403);
        }

        $query = User::query();

        if (!empty($request->get('s'))) {
            $query->search($request->get('s'));
        }

        if (!empty($request->get('orderBy'))) {
            $query->orderBy($request->get('orderBy'), $request->get('order', 'asc'));
        }

        return Inertia::render('Users/Index', [
            'items' => UserResource::collection($query->paginate($request->get('per_page', 10))->withQueryString()->onEachSide(2)),
        ]);
    }

    public function create()
    {
        if (! Gate::allows('manage-users')) {
            abort(403);
        }

        return Inertia::render('Users/Edit');
    }

    public function store(UserCreateRequest $request)
    {
        if (! Gate::allows('manage-users')) {
            abort(403);
        }

        $user = $this->createCommand->handle($request->validated());
        return redirect()->route('users.edit', ['user' => $user])->with(['message' => __('messages.saved')]);
    }

    public function edit(User $user)
    {
        if (! Gate::allows('manage-users')) {
            abort(403);
        }

        return Inertia::render('Users/Edit', [
            'item' => new UserResource($user),
        ]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        if (! Gate::allows('manage-users')) {
            abort(403);
        }

        $this->updateCommand->handle($user, $request->validated());

        return redirect()->back()->with(['message' => __('messages.saved')]);
    }

    public function destroy(User $user)
    {
        if (! Gate::allows('manage-users')) {
            abort(403);
        }

        $user->delete();
        return redirect()->back()->with(['message' => __('messages.deleted')]);
    }
}
