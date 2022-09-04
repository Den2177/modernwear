<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/admin', [\App\Http\Controllers\AdminController::class, 'getAdminPage']);

Route::get('/admin/products/{product}/delete', [\App\Http\Controllers\ProductController::class, 'delete'])->name('product.delete');
Route::get('/admin/products/{product}/edit', [\App\Http\Controllers\ProductController::class, 'edit'])->name('product.edit');
Route::post('/admin/products/{product}/update', [\App\Http\Controllers\ProductController::class, 'update'])->name('product.update');
Route::post('/admin/products', [\App\Http\Controllers\ProductController::class, 'create'])->name('product.create');

Route::get('/admin/category/{category}/delete', [\App\Http\Controllers\CategoryController::class, 'delete'])->name('category.delete');
Route::get('/admin/category/{category}/edit', [\App\Http\Controllers\CategoryController::class, 'edit'])->name('category.edit');
Route::post('/admin/category/store', [\App\Http\Controllers\CategoryController::class, 'store'])->name('category.store');
Route::post('/admin/category/{category}/update', [\App\Http\Controllers\CategoryController::class, 'update'])->name('category.update');
Route::get('/admin/category/add', [\App\Http\Controllers\CategoryController::class, 'addProduct'])->name('category.add-product');

Route::get('/admin/users/{user}/edit', [\App\Http\Controllers\UserController::class, 'edit'])->name('user.edit');
Route::post('/admin/users/store', [\App\Http\Controllers\UserController::class, 'store'])->name('user.store');
Route::post('/admin/users/{user}/update', [\App\Http\Controllers\UserController::class, 'update'])->name('user.update');
Route::get('/admin/users/{user}/delete', [\App\Http\Controllers\UserController::class, 'delete'])->name('user.delete');

Route::get('/{route}', [\App\Http\Controllers\BaseController::class, 'getUserPage'])->where('route', '.*');

