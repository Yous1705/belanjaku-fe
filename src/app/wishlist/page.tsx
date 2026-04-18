"use client";
import { getMyWishlistsApi } from "@/api/services/product/product.services";
import WishlistCard from "@/components/layout/WishlistCard";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MyWishlistType } from "@/type/product.type";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function WishlistPage() {
  const router = useRouter();
  const [products, setProducts] = useState<MyWishlistType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMyWishlistsApi()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  });
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.2] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col gap-8 mb-16">
          <button
            className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-all w-fit"
            onClick={() => router.push("/product")}
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Return to Gallery
            </span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                My <span className="text-zinc-200">Wishlist</span>
              </h1>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
                You have {products.length} curated pieces in your collection
              </p>
            </div>
          </div>
        </div>

        {/* Content Section: Table with Gallery Look */}
        <div className="bg-white border-t border-zinc-100 overflow-hidden">
          {products.length > 0 ? (
            <Table>
              <TableHeader className="bg-transparent">
                <TableRow className="border-zinc-100 hover:bg-transparent">
                  <TableHead className="w-[500px] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                    Product Details
                  </TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                    Value
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <WishlistCard
                    key={product.id}
                    images={product.images}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 border-b border-zinc-100">
              <div className="p-8 bg-zinc-50 rounded-full mb-6">
                <ShoppingBag
                  size={48}
                  className="text-zinc-200"
                  strokeWidth={1}
                />
              </div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-zinc-400 text-sm mb-8">
                Start curating your favorite pieces now.
              </p>
              <button
                onClick={() => router.push("/product")}
                className="px-10 h-14 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all"
              >
                Go To Gallery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
