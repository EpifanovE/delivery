<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("total");
            $table->bigInteger("product_id")->unsigned()->nullable();
            $table->bigInteger("subscriber_id")->unsigned()->nullable();
            $table->bigInteger("bot_id")->unsigned()->nullable();
            $table->json("details")->nullable();
            $table->string('status', 16)->nullable();
            $table->string('notes')->nullable();
            $table->timestamps();

            $table->foreign("product_id")->references("id")->on("products")->onDelete("set null");
            $table->foreign("subscriber_id")->references("id")->on("subscribers")->onDelete("set null");
            $table->foreign("bot_id")->references("id")->on("bots")->onDelete("set null");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
