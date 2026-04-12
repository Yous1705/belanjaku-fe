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
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div
              className="flex items-center gap-2 text-slate-500 mb-2 cursor-pointer hover:text-slate-800 transition-colors"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium ">Back</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Wishlist
            </h1>
            <p className="text-slate-500 mt-1">
              Anda memiliki {WishlistCard.length} barang di wishlist
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border-slate-200 overflow-hidden">
            {products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Action</TableHead>
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
