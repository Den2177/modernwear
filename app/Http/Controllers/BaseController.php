<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function getUserPage()
    {
        return view('base');
    }

    public function getAdminPage()
    {
        return view('admin');
    }
}
