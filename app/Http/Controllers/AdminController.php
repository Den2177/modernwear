<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAdminPage()
    {
        $products = Product::all();
        $categories = Category::all();
        $sizes = Size::all();
        $users = User::all();
        return view('admin', compact('products', 'categories', 'sizes', 'users'));
    }
}
