<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string("mime", 1024)->nullable();
            $table->string("filename");
            $table->boolean("is_private")->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('attachments');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
};
