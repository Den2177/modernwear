<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
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


        $user = User::where('login', $data['login'])->firstWhere('password', $data['password']);

        if (!$user) {
            return response()->json(
                [
                    'errors' => 'User unauthorized',
                ], 401
            );
        }

        $user->api_token = \Illuminate\Support\Str::random() . uniqid();

        return response()->json(
            [
                'message' => [
                    'user' => new UserResource($user),
                ],
            ], 200
        );
    }
}
