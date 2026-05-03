"use client";
import { getProductsApi } from "@/api/services/product/product.services";
import TableProduct from "@/components/layout/admin/TableProduct";
import UpdateDrawer from "@/components/layout/admin/UpdateDrawer";
import { ProductType } from "@/type/admin/admin-product.type";

import { ProductTypeDashboard } from "@/type/product.type";
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

function AdminProductPage() {
  const [product, setProduct] = useState<ProductType[]>();
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductsApi()
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Manajemen Produk
              </h2>
              <p className="text-slate-500 text-sm">
                Kelola inventaris dan detail produk Anda secara efisien.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-sm hover:shadow-md active:scale-95 text-sm">
                <Plus size={18} />
                Tambah Produk
              </button>
            </div>
          </div>

          {product && <TableProduct data={product} />}
        </main>
      </div>
    </div>
  );
}

export default AdminProductPage;
