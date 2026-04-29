"use client";
import { getCartItem } from "@/api/services/cart/cart.services";
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
import {
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const total = products?.grandTotal ?? 0;

  useEffect(() => {
    getCartItem()
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white pb-20">
      <div className="bg-zinc-50 border-b border-zinc-100 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                Your <br />
                <span className="text-zinc-300 italic">Curated</span> Pieces.
              </h1>
              <p className="mt-6 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em]">
                {products?.items?.length ?? 0} ARCHITECTURAL OBJECTS READY FOR
                DELIVERY
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-100/50 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {(products?.items?.length ?? 0) > 0 ? (
              <div className="divide-y divide-zinc-100">
                {products?.items?.map((item, idx) => (
                  <CartCard key={idx} {...item} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-6">
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto text-zinc-200">
                  <ShoppingCart size={40} />
                </div>
                <p className="text-zinc-400 font-black uppercase tracking-widest">
                  Cart is empty.
                </p>
                <button className="bg-zinc-900 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest">
                  Browse Objects
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-zinc-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-zinc-900/20">
              <h3 className="text-lg font-black uppercase tracking-widest mb-10 italic">
                Summary
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-sm font-bold tracking-tight">
                    IDR {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Shipping
                  </span>
                  <span className="text-sm font-bold tracking-tight uppercase">
                    Calculated at Next Step
                  </span>
                </div>

                <div className="h-[1px] bg-zinc-800 my-8" />

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                      Estimated Total
                    </p>
                    <p className="text-3xl font-black tracking-tighter italic">
                      IDR {products?.grandTotal.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  className="w-full bg-white text-zinc-900 py-6 rounded-2xl flex items-center justify-center gap-4 group hover:bg-zinc-100 transition-all active:scale-95 mt-10"
                  onClick={() => router.push(`/checkout?type=cart`)}
                >
                  <span className="text-xs font-black uppercase tracking-[0.3em]">
                    PROCEED TO CHECKOUT
                  </span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-zinc-50 rounded-[2rem] border border-zinc-100 p-8 space-y-6">
              <div className="flex items-center gap-4 text-zinc-400">
                <ShieldCheck size={20} strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                    Secure Checkout
                  </p>
                  <p className="text-[9px] font-medium uppercase mt-0.5">
                    SSL Encrypted Transaction
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Truck size={20} strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">
                    Vantage Logistics
                  </p>
                  <p className="text-[9px] font-medium uppercase mt-0.5">
                    Insured White-Glove Delivery
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
