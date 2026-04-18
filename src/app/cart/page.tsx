"use client";
import { getChartItem } from "@/api/services/cart/cart.services";
import { checkOutCartItem } from "@/api/services/transaction/transaction.services";
import CartCard from "@/components/layout/CartCard";
import WishlistCard from "@/components/layout/WishlistCard";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartItemType, CartResponse } from "@/type/product.type";
import React, { useEffect, useState } from "react";

function CartPage() {
  const [products, setProducts] = useState<CartResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChartItem()
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCreateCheckOutItem = async () => {
    try {
      const response = await checkOutCartItem();
    } catch (error) {
      console.error("Gagal Checkout: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="fixed inset-0 bg-gray-100">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="group flex items-center gap-2 px-6 py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify=between gap-6">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                  My <span className="text-zinc-200">Cart</span>
                </h1>
                <p className="text-lg font-bold text-zinc-400 uppercase tracking-[0.3em]">
                  You have {products?.items.length} curated pieces in your
                  collection
                </p>
                <button
                  className="px-4 py-4 bg-zinc-300 hover:bg-zinc-500"
                  onClick={() => handleCreateCheckOutItem()}
                >
                  Buy All
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-zinc-100 overflow-hidden">
            {products?.items.length ? (
              <div>
                <Table>
                  <TableHeader className="bg-transparent">
                    <TableRow className="border-zinc-100 hover:bg-transparent">
                      <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                        Product Details
                      </TableHead>
                      <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                        Quantity
                      </TableHead>
                      <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                        Price
                      </TableHead>
                      <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                        Total Price
                      </TableHead>
                      <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  {products?.items.map((i) => (
                    <TableBody key={i.product.slug}>
                      <CartCard
                        product={i.product}
                        currentPrice={i.currentPrice}
                        quantity={i.quantity}
                        totalPrice={i.totalPrice}
                      />
                    </TableBody>
                  ))}
                </Table>
                <div className="text-xl font-bold">
                  Total : Rp {products.grandTotal.toLocaleString()}
                </div>
              </div>
            ) : (
              <div>Your wishlist is empty</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
