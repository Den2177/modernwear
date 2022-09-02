<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->all();

        $validator = validator($data, [
            'login' => 'required|string|alpha_num',
            'password' => 'required|string|alpha_num',
            'passwordConfirmation' => 'required|string',
        ]);


        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }

        unset($data['passwordConfirmation']);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        return response()->json(
            [
                'message' => 'Successful register',
            ], 200
        );

    }

    public function login(Request $request)
    {
        $data = $request->all();

        $validator = validator($data, [
            'login' => 'required|exists:users,login',
            'password' => 'required|string|alpha_num'
        ]);

        if ($validator->fails()) {
            return $this->sendBadRequest($validator->errors());
        }



        if (!Auth::attempt($data)) {
            return response()->json(
                [
                    'message' => 'user unauthorized',
                ], 401
            );
        }

        $user = User::firstWhere('login', $data['login']);
        $user->api_token = \Illuminate\Support\Str::random() . uniqid();

        return response()->json(
            [
                'message' => [
                    'isAdmin' => $user->isAdmin,
                    'token' => $user->api_token,
                ],
            ], 200
        );
    }
}
