<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\UserProductsResource;
use App\Models\Product;
use App\Models\User;
use App\Models\UserProducts;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addProduct(Request $request, User $user, Product $product)
    {
        $count = $request->input('count');

        $cartItem = UserProducts::create([
            'product_count' => $count,
            'product_id' => $product->id,
            'user_id' => $user->id,
        ]);

        return response()->json(
            [
                'product' => new UserProductsResource($cartItem),
            ], 200
        );
    }

    public function deleteProduct(UserProducts $userProducts)
    {
        $userProducts->delete();

        return response()->json(
            [
                'message' => 'success delete',
            ], 200
        );
    }

    public function getProducts(User $user)
    {
        $userCart = UserProducts::where('user_id', $user->id)->get();

        return UserProductsResource::collection($userCart);
    }
}
