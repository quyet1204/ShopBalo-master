<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Storage extends Model
{
    use HasFactory;
    protected  $table = 'storages';
    protected $fillable = [
        'product_id',
        'provider_id',
        'amount'
    ];

    public function products(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function providers(): BelongsTo
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
    public function scopeSort($query, $request)
    {
        return $query
            ->when($request->has("sort"), function ($query) use ($request) {
                $sortBy = '';
                $sortValue = '';

                foreach ($request->query("sort") as $key => $value) {
                    $sortBy = $key;
                    $sortValue = $value;
                }

                $query->orderBy($sortBy, $sortValue);
            });
    }
    public function scopeSearch($query, $request)
    {
        return $query
            ->when($request->has('search'), function ($query) use ($request) {
                $search = $request->query('search');
                $query->where("product_id", "LIKE", "%{$search}%")
                    ->orWhere("provider_id", "LIKE", "%{$search}%");
            });
    }
    public function scopeFilter($query, $request)
    {
        // dd($request->query("filter")["type"]);
        return $query->when($request->has('filter.provider_id'), function ($query) use ($request) {
            $list = explode(",", $request->query("filter")["provider_id"]);
            $query->whereIn("provider_id", $list);
        })
            ->when($request->has('filter.product_id'), function ($query) use ($request) {
                $list = explode(",", $request->query("filter")["product_id"]);
                $query->whereIn("product_id", $list);
            });
    }
}
