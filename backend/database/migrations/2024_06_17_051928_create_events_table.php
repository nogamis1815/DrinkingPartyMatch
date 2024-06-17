<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('zipcode', 10);
            $table->string('prefecture');
            $table->string('city');
            $table->string('town');
            $table->integer('participants');
            $table->integer('age');
            $table->enum('gender', ['male', 'female']);
            $table->string('photo')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
}
