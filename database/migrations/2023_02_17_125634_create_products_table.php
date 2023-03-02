<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 1024);
            $table->integer('price');
            $table->string('description', 4096)->default('');
            $table->boolean('is_active')->default(true);
            $table->json('attributes')->nullable();
            $table->bigInteger('attachment_id')->unsigned()->nullable();
            $table->integer('order_column');
            $table->timestamps();

            $table->foreign('attachment_id')->references('id')
                ->on('attachments')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
