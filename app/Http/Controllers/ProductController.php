<?php

namespace App\Http\Controllers;

use App\Commands\Product\ProductCreate;
use App\Commands\Product\ProductUpdate;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\Product\ProductRequest;
use App\Http\Resources\Product\ProductCollectionResource;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    private ProductCreate $createCommand;

    private ProductUpdate $updateCommand;

    public function __construct(ProductCreate $createCommand, ProductUpdate $updateCommand)
    {
        $this->createCommand = $createCommand;
        $this->updateCommand = $updateCommand;
    }

    public function index(IndexRequest $request)
    {
        $query = Product::query();

        if (!empty($request->get('s'))) {
            $query->search($request->get('s'));
        }

        if (!empty($request->get('orderBy'))) {
            $query->orderBy($request->get('orderBy'), $request->get('order', 'asc'));
        }

        return Inertia::render('Products/Index', [
            'items' => ProductCollectionResource::collection($query->paginate($request->get('per_page', 10))->withQueryString()->onEachSide(2)),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Edit');
    }

    public function store(ProductRequest $request)
    {
        $product = $this->createCommand->handle($request->validated());
        return redirect()->route('products.edit', ['product' => $product])->with(['message' => __('messages.saved')]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'item' => new ProductResource($product),
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $this->updateCommand->handle($product, $data);
        return redirect()->back()->with(['message' => __('messages.saved')]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back()->with(['message' => __('messages.deleted')]);
    }
}
