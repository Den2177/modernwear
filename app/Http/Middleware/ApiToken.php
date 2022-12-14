<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $bearer = $request->bearerToken();

        if (!$bearer) {
            $user = User::query()->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Forbidden'
                ], 403);
            }

            Auth::login($user);
        }

        return $next($request);
    }
}
