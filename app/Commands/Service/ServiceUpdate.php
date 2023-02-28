<?php

declare(strict_types=1);

namespace App\Commands\Service;

use App\Commands\Attachment\AttachmentCreateByModel;
use App\Models\Service\Service;
use Illuminate\Http\UploadedFile;

class ServiceUpdate
{
    protected AttachmentCreateByModel $attachmentCreateByModel;

    public function __construct(AttachmentCreateByModel $attachmentCreateByModel)
    {
        $this->attachmentCreateByModel = $attachmentCreateByModel;
    }

    public function handle(Service $service, array $data): Service
    {
        $data['description'] = $data['description'] ?? '';

        $service->fill($data);

        if (!empty($data['image']) && $data['image'] instanceof UploadedFile) {
            if (!empty($service->image)) {
                $service->image->delete();
            }

            $this->attachmentCreateByModel->handle($service, $data);

        } elseif (empty($data['image']) && !empty($service->image)) {
            $service->image->delete();
        }

        $service->save();
        $service->refresh();

        return $service;
    }
}
