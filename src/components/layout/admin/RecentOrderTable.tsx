import { RecentOrderType } from "@/type/admin/dashboard.type";
import React from "react";

const formatCurrency = (val: any) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

const statusColors = {
  COMPLETED: "bg-green-100 text-green-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  PAID: "bg-indigo-100 text-indigo-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function RecentOrderTable({ data }: RecentOrderType) {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <p className="text-sm text-slate-500">The last 10 transactions</p>
        </div>
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-sm font-medium text-slate-600">
                  {order.orderId}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.user.avatar || "/images/avatar.jpg"}
                      className="w-8 h-8 rounded-full bg-slate-100"
                      onError={(e) => {
                        e.currentTarget.src = "/images/avatar.jpg";
                      }}
                      alt=""
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {order.user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {order.createdAt}
                </td>
                <td className="px-6 py-4 font-bold text-sm">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${statusColors[order.status as keyof typeof statusColors] ?? ""}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
