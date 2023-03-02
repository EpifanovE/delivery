<?php

namespace App\Http\Controllers;

use App\Commands\Order\OrderCreate;
use App\Commands\Order\OrderUpdate;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\Order\OrderCreateRequest;
use App\Http\Requests\Order\OrderRequest;
use App\Http\Requests\Order\OrderUpdateRequest;
use App\Http\Resources\Order\OrderCollectionResource;
use App\Http\Resources\Order\OrderResource;
use App\Models\Order\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    private OrderCreate $createCommand;

    private OrderUpdate $updateCommand;

    public function __construct(OrderCreate $createCommand, OrderUpdate $updateCommand)
    {
        $this->createCommand = $createCommand;
        $this->updateCommand = $updateCommand;
    }

    public function index(IndexRequest $request)
    {
        $query = Order::query()->with(['product', 'subscriber', 'bot']);

        if (!empty($request->get('s'))) {
            $query->search($request->get('s'));
        }

        if (!empty($request->get('status'))) {
            $query->status($request->get('status'));
        }

        if (!empty($request->get('orderBy'))) {
            $query->orderBy($request->get('orderBy'), $request->get('order', 'asc'));
        }

        return Inertia::render('Orders/Index', [
            'items' => OrderCollectionResource::collection($query->paginate($request->get('per_page', 10))->withQueryString()->onEachSide(2)),
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Edit');
    }

    public function store(OrderCreateRequest $request)
    {
        $order = $this->createCommand->handle($request->validated());
        return redirect()->route('products.edit', ['product' => $order])->with(['message' => __('messages.saved')]);
    }

    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit', [
            'item' => new OrderResource($order),
        ]);
    }

    public function update(OrderUpdateRequest $request, Order $order)
    {
        $data = $request->validated();
        $this->updateCommand->handle($order, $data);
        return redirect()->back()->with(['message' => __('messages.saved')]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->back()->with(['message' => __('messages.deleted')]);
    }
}
