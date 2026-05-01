"use client";
import {
  getRecentOrderApi,
  getSalesChartApi,
  getSummaryApi,
} from "@/api/services/admin/dashboard/dashboard.services";
import {
  RecentOrderType,
  SalesChartType,
  SummaryType,
} from "@/type/admin/dashboard.type";
import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [summary, setSummary] = useState<SummaryType>();
  const [salesChart, setSalesChart] = useState<SalesChartType>();
  const [recentOrders, setRecentOrders] = useState<RecentOrderType>();
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
    getSalesChartApi()
      .then((data) => setSalesChart(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    getRecentOrderApi()
      .then((res) => setRecentOrders(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {/* Get Summary */}
      <div>
        <h1>Summary</h1>
        <div>{summary?.data.totalUser}</div>
        <div>{summary?.data.totalProduct}</div>
        <div>{summary?.data.totalOrder}</div>
        <div>Rp. {summary?.data.payment._sum.amount.toLocaleString()}</div>
        <div>{summary?.data.pendingOrder}</div>
        <div>{summary?.data.completedOrder}</div>
      </div>

      {/* Sales Chart */}
      <div>
        <h1 className="pt-10"> Chart</h1>
        {salesChart?.data.map((chart) => (
          <div key={chart.date}>
            <div>{chart.date}</div>
            <div>{chart.total}</div>
          </div>
        ))}
      </div>

      {/* Recent Order */}
      <div>
        <h1 className="pt-10">Recent Order</h1>
        <div>
          {recentOrders?.data.map((order) => (
            <div key={order.id}>
              <div>{order.shippingRecipientName}</div>
              <div>{order.shippingAddress}</div>
              <div>{order.shippingCity}</div>
              <div>Rp. {order.payment.amount.toLocaleString()}</div>
              <div>{order.payment.createdAt}</div>
              <div>{order.status}</div>
              {order.items.map((item) => (
                <div key={item.productId}>
                  <div>{item.product.name}</div>
                  <div>{item.product.category.name}</div>
                  <div>Rp. {item.product.price.toLocaleString()}</div>
                  <div>{item.quantity}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Top Product */}
      <div></div>
    </div>
  );
}

export default DashboardPage;
