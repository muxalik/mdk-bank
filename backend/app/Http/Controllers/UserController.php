<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function store(StoreUserRequest $request): Response
    {
        User::create($request->validated());

        return response()->noContent();
    }
}
