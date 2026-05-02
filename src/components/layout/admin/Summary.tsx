import { SummaryType } from "@/type/admin/dashboard.type";
import React from "react";
import StatsCard from "./StatsCard";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { Stats } from "fs";

export default function Summary({ data }: SummaryType) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        label="Total Revenue"
        value={"Rp. " + data.payment._sum.amount}
        icon={<DollarSign className="text-emerald-600" />}
        trend="+12%"
        color="bg-emerald-50 border-emerald-100"
      />

      <StatsCard
        label="Total Orders"
        value={data.totalOrder}
        icon={<ShoppingCart className="text-blue-600" />}
        trend="+12%"
        color="bg-blue-50 border-blue-100"
      />

      <StatsCard
        label="Total Products"
        value={data.totalProduct}
        icon={<Package className="text-indigo-600" />}
        trend="stable"
        color="bg-indigo-50 border-indigo-100"
      />

      <StatsCard
        label="Active Users"
        value={data.totalUser}
        icon={<Users className="text-vilet-600" />}
        trend="+12%"
        color="bg-violet-50 border-violet-100"
      />
    </div>
  );
}
