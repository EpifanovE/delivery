<?php

namespace App\Models\Attachment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = [
        "mime", "filename", "is_private",
    ];

    protected $casts = [
        "is_private" => "boolean",
    ];

    protected static function booted()
    {
        static::deleted(function ($attachment) {
            $attachment->deleteFiles();
        });
    }

    public function getPublicUrl(): ?string
    {
        if ($this->is_private) {
            return null;
        }

        if (env('APP_ENV') === 'local') {
            return 'https://devbot.digitfab.ru/storage/' . "{$this->id}/$this->filename";
        }

        return Storage::disk("public")->url("{$this->id}/$this->filename");
    }

    public function getThumbUrl(): ?string
    {
        if ($this->is_private) {
            return null;
        }

        if ($this->hasThumb()) {
            return Storage::disk("public")->url("{$this->id}/thumb." . $this->getExt());
        }

        if ($this->isImage()) {
            return Storage::disk("public")->url("{$this->id}/$this->filename");
        }

        return null;
    }

    public function getPath(): string
    {
        return Storage::disk('public')->path("/{$this->id}/{$this->filename}");
    }

    public function saveFile(UploadedFile $file): void
    {
        Storage::disk('public')->putFileAs("/{$this->id}/", $file, $file->getClientOriginalName());

        if ($this->hasThumb()) {
            $this->createThumb($file);
        }
    }

    public function deleteFiles()
    {
        Storage::disk('public')->deleteDirectory($this->id);
    }

    public function createThumb(UploadedFile $file): void
    {
        $thumbImage = Image::make($file)->fit(200, 200);
        $thumbImage->save(Storage::disk('public')->path("{$this->id}/thumb.{$file->getClientOriginalExtension()}"));
    }

    public function isImage(): bool
    {
        return in_array($this->mime, ["image/jpeg", "image/png", "image/gif", "image/svg+xml",]);
    }

    public function hasThumb(): bool
    {
        if ($this->is_private) {
            return false;
        }

        return in_array($this->mime, ["image/jpeg", "image/png", "image/gif",]);
    }

    public function getExt(): string
    {
        $arr = explode(".", $this->filename);
        return end($arr);
    }
}
