<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('log_events', function (Blueprint $table) {
            $table->id();
            $table->integer("code");
            $table->json("payload")->nullable();
            $table->bigInteger("subscriber_id")->unsigned()->nullable();
            $table->timestamp('created_at')->nullable();

            $table->foreign('subscriber_id')
                ->references('id')->on('subscribers')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('log_events');
    }
};
