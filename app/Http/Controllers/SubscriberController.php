<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexRequest;
use App\Http\Requests\Subscriber\StoreSubscriberRequest;
use App\Http\Requests\Subscriber\UpdateSubscriberRequest;
use App\Http\Resources\Subscriber\SubscriberResource;
use App\Http\Resources\Subscriber\SubscriberResourceCollectionItem;
use App\Models\Subscriber\Subscriber;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SubscriberController extends Controller
{
    public function index(IndexRequest $request)
    {
        $query = Subscriber::query();

        if (!empty($request->get('s'))) {
            $query->search($request->get('s'));
        }

        if (!empty($request->get('orderBy'))) {
            $query->orderBy($request->get('orderBy'), $request->get('order', 'asc'));
        }

        return Inertia::render('Subscribers/Index', [
            'items' => SubscriberResourceCollectionItem::collection($query->paginate($request->get('per_page', 10))->withQueryString()->onEachSide(2)),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(StoreSubscriberRequest $request)
    {
        //
    }

    public function show(Subscriber $subscriber)
    {
        //
    }

    public function edit(Subscriber $subscriber)
    {
        return Inertia::render('Subscribers/Edit', [
            'item' => new SubscriberResource($subscriber),
        ]);
    }

    public function update(UpdateSubscriberRequest $request, Subscriber $subscriber)
    {
        //
    }

    public function destroy(Subscriber $subscriber)
    {
        $subscriber->delete();
        return redirect()->back()->with(['message' => __('messages.deleted')]);
    }

    public function block(Subscriber $subscriber)
    {
        $subscriber->toggleBlock();
        $message = empty($subscriber->is_blocked) ? __('messages.unblocked') : __('messages.blocked');
        return redirect()->back()->with(['message' => $message]);
    }
}
