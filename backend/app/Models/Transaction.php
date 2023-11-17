<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'from',
        'to',
        'amount',
    ];

    public function from(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from');
    }

    public function to(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to');
    }
}
