import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import {
  RecentOrderType,
  SalesChartType,
  SummaryType,
} from "@/type/admin/dashboard.type";

export async function getSummaryApi() {
  return apiFetch<SummaryType>("/admin/dashboard/summary", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getSalesChartApi() {
  return apiFetch<SalesChartType>("/admin/dashboard/sales-chart", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getRecentOrderApi() {
  return apiFetch<RecentOrderType>("/admin/dashboard/recent-orders", {
    method: "Get",
    headers: authHeader(),
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
