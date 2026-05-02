import React from "react";

export default function StatusProgress({ label, count, total, color }: any) {
  const percentage = Math.round((count / total) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium text-slate-600">
        <span>{label}</span>
        <span className="font-bold">
          {count} ({percentage}%)
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
