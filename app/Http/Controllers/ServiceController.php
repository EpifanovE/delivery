<?php

namespace App\Http\Controllers;

use App\Commands\Service\ServiceCreate;
use App\Commands\Service\ServiceUpdate;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\Service\ServiceRequest;
use App\Http\Resources\Service\ServiceCollectionResource;
use App\Http\Resources\Service\ServiceResource;
use App\Models\Service\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    private ServiceCreate $createCommand;

    private ServiceUpdate $updateCommand;

    public function __construct(ServiceCreate $createCommand, ServiceUpdate $updateCommand)
    {
        $this->createCommand = $createCommand;
        $this->updateCommand = $updateCommand;
    }

    public function index(IndexRequest $request)
    {
        $query = Service::query();

        if (!empty($request->get('s'))) {
            $query->search($request->get('s'));
        }

        if (!empty($request->get('orderBy'))) {
            $query->orderBy($request->get('orderBy'), $request->get('order', 'asc'));
        }

        return Inertia::render('Services/Index', [
            'items' => ServiceCollectionResource::collection($query->paginate($request->get('per_page', 10))->withQueryString()->onEachSide(2)),
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/Edit');
    }

    public function store(ServiceRequest $request)
    {
        $service = $this->createCommand->handle($request->validated());
        return redirect()->route('services.edit', ['service' => $service])->with(['message' => __('messages.saved')]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('Services/Edit', [
            'item' => new ServiceResource($service),
        ]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $data = $request->validated();
        $this->updateCommand->handle($service, $data);
        return redirect()->back()->with(['message' => __('messages.saved')]);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->back()->with(['message' => __('messages.deleted')]);
    }
}
