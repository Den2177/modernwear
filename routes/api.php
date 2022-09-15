<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::get('/products', [\App\Http\Controllers\ProductController::class, 'getProducts']);
Route::get('/cats', [\App\Http\Controllers\CategoryController::class, 'getCats']);
Route::get('/sizes', [\App\Http\Controllers\SizeController::class, 'getSizes']);

Route::get('/cart/{user}/add/{product}', [\App\Http\Controllers\CartController::class, 'addProduct']);
Route::get('/cart/delete/{userProducts}', [\App\Http\Controllers\CartController::class, 'deleteProduct']);
Route::get('/cart/{user}', [\App\Http\Controllers\CartController::class, 'getProducts']);
