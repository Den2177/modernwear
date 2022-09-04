<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        $validator = validator($data, [
            'login' => 'required|string',
            'password' => 'required|string|alpha_num'
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }

        $data['isAdmin'] = $request->has('isAdmin');

        User::create($data);

        return back();
    }

    public function edit(User $user)
    {
        return view('user.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $data = $request->all();
        $validator = validator($data, [
            'login' => 'nullable|string',
            'password' => 'nullable|string|alpha_num'
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }

        $data = array_filter($data, function($current) {
            return !empty($current);
        });

        $data['isAdmin'] = $request->has('isAdmin');

        $user->update($data);

        return redirect('/admin');
    }

    public function delete(User $user)
    {
        $user->delete();
        return redirect('/admin');
    }
}
