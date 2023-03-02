<?php

namespace Database\Seeders;

use App\Models\Product\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory()->count(1)->create([
            'name' => 'Газель Фермер Фургон',
            'attributes' => [
                ['name' => 'Длина', 'value' => '2м',],
                ['name' => 'Ширина', 'value' => '2м',],
                ['name' => 'Высота', 'value' => '2м',],
                ['name' => 'Грузоподъемность', 'value' => '1.5т',],
            ],
            'order_column' => 1,
        ]);

        Product::factory()->count(1)->create([
            'name' => 'Газель Фермер Тент',
            'attributes' => [
                ['name' => 'Длина', 'value' => '2м',],
                ['name' => 'Ширина', 'value' => '2м',],
                ['name' => 'Высота', 'value' => '1.5м',],
                ['name' => 'Грузоподъемность', 'value' => '1.5т',],
            ],
            'order_column' => 2,
        ]);

        Product::factory()->count(1)->create([
            'name' => 'Газель Фермер Кузов',
            'attributes' => [
                ['name' => 'Длина', 'value' => '2м',],
                ['name' => 'Ширина', 'value' => '2м',],
                ['name' => 'Грузоподъемность', 'value' => '1.5т',],
            ],
            'order_column' => 3,
        ]);

        Product::factory()->count(1)->create([
            'name' => 'Газель Фургон',
            'attributes' => [
                ['name' => 'Длина', 'value' => '3м',],
                ['name' => 'Ширина', 'value' => '2м',],
                ['name' => 'Высота', 'value' => '2м',],
                ['name' => 'Грузоподъемность', 'value' => '2.5т',],
            ],
            'order_column' => 4,
        ]);

        Product::factory()->count(1)->create([
            'name' => 'Газель Тент',
            'attributes' => [
                ['name' => 'Длина', 'value' => '3м',],
                ['name' => 'Ширина', 'value' => '2м',],
                ['name' => 'Высота', 'value' => '1.5м',],
                ['name' => 'Грузоподъемность', 'value' => '2.5т',],
            ],
            'order_column' => 5,
        ]);

        Product::factory()->count(1)->create([
            'name' => 'Газель Кузов',
            'attributes' => [
                ['name' => 'Длина', 'value' => '3м',],
                ['name' => 'Ширина', 'value' => '2м',],
                ['name' => 'Грузоподъемность', 'value' => '2.5т',],
            ],
            'order_column' => 6,
        ]);
    }
}
