<?php

declare(strict_types=1);

namespace App\Commands\Product;

use App\Commands\Attachment\AttachmentCreateByModel;
use App\Models\Product\Product;
use Illuminate\Http\UploadedFile;

class ProductUpdate
{
    protected AttachmentCreateByModel $attachmentCreateByModel;

    public function __construct(AttachmentCreateByModel $attachmentCreateByModel)
    {
        $this->attachmentCreateByModel = $attachmentCreateByModel;
    }

    public function handle(Product $product, array $data): Product
    {
        $data['description'] = $data['description'] ?? '';

        $product->fill($data);

        if (!empty($data['image']) && $data['image'] instanceof UploadedFile) {
            if (!empty($product->image)) {
                $product->image->delete();
            }

            $this->attachmentCreateByModel->handle($product, $data);

        } elseif (empty($data['image']) && !empty($product->image)) {
            $product->image->delete();
        }

        $product->save();
        $product->refresh();

        return $product;
    }
}
