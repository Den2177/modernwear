<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::middleware(\App\Http\Middleware\ApiToken::class)->group(function () {
    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'getProducts']);
    Route::get('/cats', [\App\Http\Controllers\CategoryController::class, 'getCats']);
});



