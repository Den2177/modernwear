<?php

namespace App\Http\Controllers;

use App\Models\Size;

class SizeController extends Controller
{
    public function getSizes()
    {
        return Size::all();
    }
}
