<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [\App\Http\Controllers\ProductController::class, 'getProducts']);
Route::get('/cats', [\App\Http\Controllers\CategoryController::class, 'getCats']);
