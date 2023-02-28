<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bot_subscriber', function (Blueprint $table) {
            $table->bigInteger('bot_id')->unsigned();
            $table->bigInteger('subscriber_id')->unsigned();

            $table->primary(["bot_id", "subscriber_id"]);

            $table->foreign('bot_id')->references('id')->on('bots')->onDelete('cascade');
            $table->foreign('subscriber_id')->references('id')->on('subscribers')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('bot_subscriber');
    }
};
