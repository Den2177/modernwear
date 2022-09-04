<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function getProducts()
    {
        return ProductResource::collection(Product::all());
    }

    public function create(Request $request)
    {
        $data = $request->all();

        $validator = validator($data, [
            'image' => 'required|image',
            'name' => 'required|string',
            'price' => 'required|string',
            'description' => 'required|string',
            'sizes' => 'array'
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }
        $name = Str::random() . uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->move(public_path('images/products'), $name);

        $product = Product::create([
            'name' => $data['name'],
            'image' => url('public/images/products/'. $name),
            'price' => $data['price'],
            'description' => $data['description'],
        ]);

        $product->sizes()->attach(array_keys($data['sizes']));

        return back();
    }

    public function delete(Product $product)
    {
        $product->categories()->detach();
        $product->sizes()->detach();
        $product->delete();

        return back();
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->all();
        $validator = validator($data, [
            'image' => 'nullable|image',
            'name' => 'nullable|string',
            'price' => 'nullable|string',
            'description' => 'nullable|string',
            'sizes' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }

        $data = array_filter($data, function($current) {
            return (bool) $current;
        });

        if ($request->hasFile('image')) {
            $name = Str::random() . uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move(public_path('images/products'), $name);
            $data['image'] = url('public/images/products/'.$name);
        }

        $fields = [];
        if (!empty($data['sizes'])) {
            $fields['sizes'] = $data['sizes'];
            unset($data['sizes']);
            $product->sizes()->sync(array_keys($fields['sizes']));
        }

        $product->update($data);

        return redirect('/admin');
    }

    public function edit(Product $product)
    {
        $products = Product::all();
        $categories = Category::all();
        $sizes = Size::all();

        return view('product.edit', compact('product', 'products', 'categories', 'sizes'));
    }
}
