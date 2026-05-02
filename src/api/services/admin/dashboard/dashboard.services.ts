import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import {
  OrderStatusType,
  RecentOrderType,
  RevenueType,
  SalesChartType,
  SummaryType,
  TopProductType,
  UserStatsType,
} from "@/type/admin/dashboard.type";

export async function getSummaryApi() {
  return apiFetch<SummaryType>("/admin/dashboard/summary", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getSalesChartApi(period: string) {
  return apiFetch<SalesChartType>(
    `/admin/dashboard/sales-chart?period=${period}`,
    {
      method: "GET",
      headers: authHeader(),
    },
  );
}

export async function getRecentOrderApi() {
  return apiFetch<RecentOrderType>("/admin/dashboard/recent-orders", {
    method: "Get",
    headers: authHeader(),
  });
}

export async function getTopProductApi() {
  return apiFetch<TopProductType>("/admin/dashboard/top-product", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getOrderStatusApi() {
  return apiFetch<OrderStatusType>("/admin/dashboard/order-status", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getRevenueApi() {
  return apiFetch<RevenueType>("/admin/dashboard/revenue", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getUserStatsApi() {
  return apiFetch<UserStatsType>("/admin/dashboard/user-stats", {
    method: "GET",
    headers: authHeader(),
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
