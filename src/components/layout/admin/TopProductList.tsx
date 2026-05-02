import { TopProductType } from "@/type/admin/dashboard.type";
import { ChevronRight } from "lucide-react";
import React from "react";
const formatCurrency = (val: any) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};
export default function TopProductList({ data }: TopProductType) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-lg">Top 10 Products</h3>
        <p className="text-sm text-slate-500">Best performers by sales</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px]">
        {data.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-2 hover:bg-slate-50 rounded-xl transition-all group"
          >
            <img
              src={product.images || "/images/image.jpg"}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = "/images/image.jpg";
              }}
              className="w-12 h-12 rounded-lg object-cover border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate group-hover:text-indigo-600 transition-colors">
                {product.name}
              </h4>
              <p className="text-xs text-slate-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">
                {formatCurrency(product.price)}
              </p>
              <p
                className={`text-[10px] font-bold ${product.stock < 10 ? "text-orange-500" : "text-slate-400"}`}
              >
                STOK: {product.stock}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50 rounded-b-2xl border-t border-slate-100">
        <button className="w-full py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
          View Inventory <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
