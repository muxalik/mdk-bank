<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTransactionRequest;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(): Collection
    {
        return Transaction::with('from', 'to')->get();
    }

    public function create(CreateTransactionRequest $request): JsonResponse
    {
        if (auth()->user()->balance < $request->amount) {
            return response()->json([
                'error' => 'Bad Request',
            ], 400);
        }

        $user = User::firstWhere('personal_account', $request->personal_account);

        DB::transaction(function () use ($request, $user) {
            auth()->user()->decrement('balance', $request->amount);
            $user->increment('balance', $request->amount);

            Transaction::create([
                'from' => auth()->user()->id,
                'to' => $user->id,
                'amount' => $request->amount,
            ]);
        });

        return response()->json([
            'balance' => auth()->user()->balance,
        ]);
    }
}
