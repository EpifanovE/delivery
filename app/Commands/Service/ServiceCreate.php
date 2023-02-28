<?php

declare(strict_types=1);

namespace App\Commands\Service;

use App\Commands\Attachment\AttachmentCreateByModel;
use App\Models\Service\Service;
use Illuminate\Http\UploadedFile;

class ServiceCreate
{
    protected AttachmentCreateByModel $attachmentCreateByModel;

    public function __construct(AttachmentCreateByModel $attachmentCreateByModel)
    {
        $this->attachmentCreateByModel = $attachmentCreateByModel;
    }

    public function handle(array $data): Service
    {
        $data['description'] = $data['description'] ?? '';

        $service = Service::create($data);

        if (!empty($data['image']) && $data['image'] instanceof UploadedFile) {
            $this->attachmentCreateByModel->handle($service, $data);
        }

        $service->refresh();

        return $service;
    }
}
