<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddBalanceRequest;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class BalanceController extends Controller
{
    public function add(AddBalanceRequest $request): JsonResponse
    {
        DB::transaction(function () use ($request) {
            $user = $request->personal_account
                ? User::firstWhere('personal_account', $request->personal_account)
                : auth()->user();

            $user->increment('balance', $request->balance);

            Transaction::create([
                'from' => $user->id,
                'to' => $user->id,
                'amount' => $request->balance,
            ]);
        });

        return response()->json([
            'balance' => auth()->user()->balance,
        ]);
    }
}
