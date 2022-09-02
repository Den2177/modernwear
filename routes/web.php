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

Route::middleware([\App\Http\Middleware\ApiToken::class])->group(function() {
    Route::get('/admin', [\App\Http\Controllers\BaseController::class, 'getAdminPage'])->middleware(['admin.basic']);
});
Route::get('/{route}', [\App\Http\Controllers\BaseController::class, 'getUserPage'])->where('route', '.*');

