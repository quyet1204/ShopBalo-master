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
        Schema::create('import_storages', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer("import_amount");
            $table->foreignId("product_id")->constrained("products");
            $table->integer("provider_id");
            $table->boolean("requirement_import");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('import_storages');
    }
};
