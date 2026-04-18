"use client";
import {
  getCheckOutItemApi,
  paymentApi,
} from "@/api/services/transaction/transaction.services";
import OrderDetail from "@/components/layout/OrderDetail";
import { OrderType } from "@/type/order.type";
import React, { useEffect, useState } from "react";

function OrderPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCheckOutItemApi()
      .then((data) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePayment = async (orderId: number) => {
    setLoading(true);
    try {
      const response = await paymentApi(orderId);
      console.log("Response: ", response);
      if (response.data?.redirect_url) {
        window.location.href = response.data.redirect_url;
      }
    } catch (error) {
      console.error("Gagal Payment: ", error);
    }
  };
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <div className="bg-white border-t border-zinc-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                  My <span className="text-zinc-200">Order</span>
                </h1>
              </div>
            </div>
          </div>
          <div>
            {orders.length > 0 ? (
              <div className="space-y-12">
                {orders.map((order) => (
                  <div key={order.id} className="border p-6 rounded-lg">
                    {order.items.map((item, index) => (
                      <OrderDetail
                        key={index}
                        product={item.product}
                        price={item.price}
                        quantity={item.quantity}
                        total={item.total}
                      />
                    ))}

                    <div className="mt-4 text-right font-black text-2xl">
                      Grand Total: Rp {order.totalPrice.toLocaleString()}
                    </div>
                    <button
                      className="bg-zinc-100 hover:bg-zinc-500 py-4 px-4 border-2"
                      onClick={() => handlePayment(order.id)}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>Your Order is Empty</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
