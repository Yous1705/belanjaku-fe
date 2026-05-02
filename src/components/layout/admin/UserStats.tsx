import { UserStatsType } from "@/type/admin/dashboard.type";
import { ShieldCheck, UserCheck } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function UserStats({ buyer, admin }: UserStatsType) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck size={16} className="text-blue-500" />
            <span className="text-sm font-medium">Buyers</span>
          </div>
          <span className="text-sm font-bold">{buyer}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-purple-500" />
            <span className="text-sm font-medium">Admins</span>
          </div>
          <span className="text-sm font-bold">{admin}</span>
        </div>
      </div>
      <div className="w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ value: buyer }, { value: admin }]}
              innerRadius={25}
              outerRadius={40}
              paddingAngle={5}
              dataKey="value"
            >
              <Cell fill="#3b82f6" />
              <Cell fill="#a855f7" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
