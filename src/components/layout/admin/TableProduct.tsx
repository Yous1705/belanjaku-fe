import { TableProductProps } from "@/type/admin/admin-product.type";

import { Edit2, Star, Trash2 } from "lucide-react";
import React, { useState } from "react";
import UpdateDrawer from "./UpdateDrawer";
const formatCurrency = (val: any) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};
export default function TableProduct({ data }: TableProductProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleEditClick = (id: number) => {
    setSelectedId(id);
    setIsDrawerOpen(true);
  };
  return (
    <div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4 text-center">Stok</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4 text-center">Rating</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            {data.map((product) => (
              <tbody key={product.id} className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          onError={(e) => {
                            e.currentTarget.src = "/images/image.jpg";
                          }}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-none mb-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-400 font-mono tracking-tight">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-sm font-medium ${product.stock < 10 ? "text-amber-600" : "text-slate-600"}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {formatCurrency(product.price)}
                      </p>
                      {product.displayPrice > product.price && (
                        <p className="text-[11px] text-slate-400 line-through">
                          {formatCurrency(product.displayPrice)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {product.reviews?.rating ?? 4}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {isDrawerOpen && selectedId && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            />
            <UpdateDrawer id={selectedId} setIsDrawerOpen={setIsDrawerOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
