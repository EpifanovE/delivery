<?php

declare(strict_types=1);

namespace App\Commands\Product;

use App\Commands\Attachment\AttachmentCreateByModel;
use App\Models\Product\Product;
use Illuminate\Http\UploadedFile;

class ProductCreate
{
    protected AttachmentCreateByModel $attachmentCreateByModel;

    public function __construct(AttachmentCreateByModel $attachmentCreateByModel)
    {
        $this->attachmentCreateByModel = $attachmentCreateByModel;
    }

    public function handle(array $data): Product
    {
        $data['description'] = $data['description'] ?? '';

        $product = Product::create($data);

        if (!empty($data['image']) && $data['image'] instanceof UploadedFile) {
            $this->attachmentCreateByModel->handle($product, $data);
        }

        $product->refresh();

        return $product;
    }
}
