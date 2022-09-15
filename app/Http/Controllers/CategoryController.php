<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function getCats()
    {
        return CategoryResource::collection(Category::all());
    }

    public function delete(Category $category)
    {
        $category->products()->detach();
        $category->delete();

        return back();
    }

    public function edit(Category $category)
    {
        return view('category.edit', compact('category'));
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->all();

        $validator = validator($data, [
            'name' => 'nullable|string',
            'image' => 'nullable|image',
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }

        $data = array_filter($data, function ($current) {
            return (bool)$current;
        });

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = Str::random() . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/categories'), $name);
            $data['image'] = url('public/images/categories/'. $name);
        }

        $data['header_visible'] = $request->has('header_visible');


        $category->update($data);

        return redirect('/admin');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $validator = validator($data, [
            'name' => 'required|string',
            'image' => 'required|image',
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }

        $name = Str::random() . uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
        $request->file('image')->move(public_path('images/categories'), $name);
        $data['image'] = url('public/images/categories/' . $name);

        if (isset($data['header_visible'])) $data['header_visible'] = true;

        Category::create(
            $data
        );

        return redirect('/admin');
    }

    public function addProduct(Request $request)
    {
        $data = $request->all();
        $productId = $data['product_id'];
        $product = Product::find($productId);

        $alreadyExists = ProductCategories::where('category_id', $data['category_id'])->firstWhere('product_id', $data['product_id']);

        if (!$alreadyExists) {
            $product->categories()->attach([$data['category_id']]);
        }

        return back();
    }
}
