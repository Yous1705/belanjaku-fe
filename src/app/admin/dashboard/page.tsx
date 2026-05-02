"use client";
import {
  getOrderStatusApi,
  getRecentOrderApi,
  getRevenueApi,
  getSalesChartApi,
  getSummaryApi,
  getTopProductApi,
  getUserStatsApi,
} from "@/api/services/admin/dashboard/dashboard.services";
import RecentOrderTable from "@/components/layout/admin/RecentOrderTable";
import SalesChart from "@/components/layout/admin/SalesChart";
import StatusProgress from "@/components/layout/admin/StatusProgress";
import Summary from "@/components/layout/admin/Summary";
import TopProductList from "@/components/layout/admin/TopProductList";
import UserStats from "@/components/layout/admin/UserStats";
import {
  OrderStatusType,
  RecentOrderType,
  RevenueType,
  SalesChartPeriodType,
  SalesChartType,
  SummaryType,
  TopProductType,
  UserStatsType,
} from "@/type/admin/dashboard.type";
import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [summary, setSummary] = useState<SummaryType>();
  const [salesChart, setSalesChart] = useState<SalesChartType>();
  const [recentOrders, setRecentOrders] = useState<RecentOrderType>();
  const [topProduct, setTopProduct] = useState<TopProductType>();
  const [orderStatus, setOrderStatus] = useState<OrderStatusType>();
  const [revenue, setRevenue] = useState<RevenueType>();
  const [userStats, setUserStats] = useState<UserStatsType>();
  const [period, setPeriod] = useState<SalesChartPeriodType>("7days");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSummaryApi()
      .then(setSummary)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);

    getSalesChartApi(period)
      .then((data) => setSalesChart(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [period]);

  useEffect(() => {
    setLoading(true);
    getRecentOrderApi()
      .then((res) => setRecentOrders(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    getTopProductApi()
      .then(setTopProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    getOrderStatusApi()
      .then(setOrderStatus)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    getRevenueApi()
      .then(setRevenue)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    getUserStatsApi()
      .then(setUserStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans items-center justify-center">
      <main className="flex-1 min-w-0 max-w-7xl">
        <div className="p-8 space-y-8">
          {summary?.data && <Summary data={summary.data} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {salesChart?.data && (
              <SalesChart
                data={salesChart.data}
                period={period}
                setPeriod={setPeriod}
              />
            )}

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Order Distribution</h3>
                <div className="space-y-4">
                  <StatusProgress
                    label="Completed"
                    count={orderStatus?.data.completed}
                    total={summary?.data.totalOrder}
                    color="bg-green-500"
                  />
                  <StatusProgress
                    label="Processing"
                    count={orderStatus?.data.processing}
                    total={summary?.data.totalOrder}
                    color="bg-blue-500"
                  />
                  <StatusProgress
                    label="Paid"
                    count={orderStatus?.data.paid}
                    total={summary?.data.totalOrder}
                    color="bg-indigo-500"
                  />
                  <StatusProgress
                    label="Shipped"
                    count={orderStatus?.data.shipped}
                    total={summary?.data.totalOrder}
                    color="bg-orange-500"
                  />
                  <StatusProgress
                    label="Pending"
                    count={orderStatus?.data.pending}
                    total={summary?.data.totalOrder}
                    color="bg-yellow-500"
                  />
                  <StatusProgress
                    label="Cancelled"
                    count={orderStatus?.data.cancelled}
                    total={summary?.data.totalOrder}
                    color="bg-red-500"
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">User Statistics</h3>
                {userStats && (
                  <UserStats
                    buyer={userStats?.buyer}
                    admin={userStats?.admin}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {recentOrders?.data && (
              <RecentOrderTable data={recentOrders.data} />
            )}

            {topProduct?.data && <TopProductList data={topProduct.data} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
