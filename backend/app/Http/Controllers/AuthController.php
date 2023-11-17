<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!$request->authenticate()) {
            return response()->json([
                'error' => 'Bad Request',
            ], 400);
        }

        $token = auth()->user()->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'name' => auth()->user()->name,
            'personal_account' => auth()->user()->personal_account,
            'balance' => auth()->user()->balance,
            'is_admin' => auth()->user()->is_admin,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
