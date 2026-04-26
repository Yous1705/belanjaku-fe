"use client";
import { getCartItem } from "@/api/services/cart/cart.services";
import { getCheckoutDetailApi } from "@/api/services/product/product.services";
import {
  buyNow,
  checkOutCartItem,
} from "@/api/services/transaction/transaction.services";
import { CartItemType, CartResponse, checkoutItem } from "@/type/product.type";
import { MapPin, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

function page() {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const slug = searchParams.get("slug") as string;

  const initialQty = Number(searchParams.get("quantity")) || 1;

  const [cartData, setCartData] = useState<CartResponse | null>(null);

  const [buyNowData, setBuyNowData] = useState<checkoutItem | null>(null);

  const [quantity, setQuantity] = useState<number>(initialQty);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    if (type === "cart") {
      getCartItem()
        .then(setCartData)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (slug) {
      getCheckoutDetailApi(slug)
        .then(setBuyNowData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [type, slug]);

  // =========================
  // BUY NOW CALCULATION
  // =========================

  const unitPrice = useMemo(() => {
    if (!buyNowData) return 0;

    return buyNowData.isDiscount && buyNowData.discountPrice
      ? Number(buyNowData.discountPrice)
      : buyNowData.price;
  }, [buyNowData]);

  const buyNowTotal = unitPrice * quantity;

  const cartTotal = cartData?.grandTotal || 0;

  const handleIncrement = () => {
    if (!buyNowData) return;

    setQuantity((prev) => Math.min(buyNowData.stock, prev + 1));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleCheckout = async () => {
    try {
      let response;

      if (type === "cart") {
        response = await checkOutCartItem();
      } else {
        if (!buyNowData) return;

        response = await buyNow(buyNowData.id, quantity);
      }

      if (response.redirect_url) {
        window.location.href = response.redirect_url;
      } else {
        alert("Checkout berhasil tetapi URL pembayaran tidak tersedia.");
      }
    } catch (error) {
      console.error("Gagal checkout:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-400 font-mono text-sm animate-pulse">
          Loading...
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-zinc-400" />
                <h2 className="font-semibold text-lg">Alamat Pengiriman</h2>
              </div>

              <div className="p-4 rounded-xl border-2 border-zinc-900 bg-zinc-50 relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-zinc-900 text-white text-xs px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    Utama
                  </span>
                </div>

                <p className="font-bold">Budi</p>
                <p className="text-sm text-zinc-500 mt-1">0811</p>

                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                  Jl.Sudirman No.123
                </p>

                <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                  Medan, Sumatera Utara, 22381
                </p>
              </div>

              <button className="w-full mt-4 py-2 border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors">
                Ubah Alamat
              </button>
            </section>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-white shadow-xl rounded-t-lg overflow-hidden border-x border-t border-zinc-200">
                {/* HEADER */}
                <div className="p-6 text-center border-b border-dashed border-zinc-300 relative">
                  <div className="flex justify-center mb-2">
                    <ShoppingBag className="w-8 h-8 text-zinc-900" />
                  </div>

                  <h2 className="text-lg font-black uppercase tracking-[0.2em]">
                    Store Receipt
                  </h2>

                  <p className="text-[10px] text-zinc-400 font-mono mt-1 uppercase">
                    INV/20231027/MPL/3512948
                  </p>

                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-zinc-50 rounded-full border border-zinc-200" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-zinc-50 rounded-full border border-zinc-200" />
                </div>

                {/* ========================= */}
                {/* CART MODE */}
                {/* ========================= */}

                {type === "cart" &&
                  cartData?.items.map((item, index) => (
                    <div className="p-6 space-y-6" key={index}>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-100">
                          <img
                            src={
                              item.product.images?.url || "/images/image.jpg"
                            }
                            onError={(e) => {
                              e.currentTarget.src = "/images/image.jpg";
                            }}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold leading-tight line-clamp-1">
                              {item.product.name}
                            </h3>

                            <p className="text-xs text-zinc-400 mt-0.5">
                              {item.product.category.name}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-zinc-200 rounded-md bg-zinc-50 px-2 py-1">
                              <span className="text-xs font-mono font-bold">
                                {item.quantity}
                              </span>
                            </div>

                            <p className="text-sm font-mono font-bold">
                              Rp {item.totalPrice.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>

                        <button className="text-zinc-300 hover:text-red-500 transition-colors self-start p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                {/* ========================= */}
                {/* BUY NOW MODE */}
                {/* ========================= */}

                {type !== "cart" && buyNowData && (
                  <div className="p-6 space-y-6 min-h-[300px]">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-100">
                        <img
                          src={buyNowData.images?.[0]?.url}
                          onError={(e) => {
                            e.currentTarget.src = "/images/image.jpg";
                          }}
                          alt={buyNowData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold leading-tight line-clamp-1">
                            {buyNowData.name}
                          </h3>

                          <p className="text-xs text-zinc-400 mt-0.5">
                            {buyNowData.category?.name}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200 rounded-md bg-zinc-50">
                            <button
                              onClick={handleDecrement}
                              className="p-1 hover:text-zinc-900 text-zinc-400 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="w-6 text-center text-xs font-mono font-bold">
                              {quantity}
                            </span>

                            <button
                              onClick={handleIncrement}
                              className="p-1 hover:text-zinc-900 text-zinc-400 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <p className="text-sm font-mono font-bold">
                            Rp {buyNowTotal.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <button className="text-zinc-300 hover:text-red-500 transition-colors self-start p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TOTAL */}
                <div className="pt-6 border-t border-dashed border-zinc-200 space-y-2 px-6 pb-6">
                  <div className="flex justify-between text-xs font-mono uppercase text-zinc-500">
                    <span>Total</span>

                    <span>
                      Rp{" "}
                      {type === "cart"
                        ? cartTotal.toLocaleString("id-ID")
                        : buyNowTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="bg-zinc-900 p-6 text-white relative">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-mono uppercase opacity-60">
                      Total Pembayaran
                    </p>
                  </div>

                  <ShoppingBag className="w-6 h-6 opacity-20 mt-2" />

                  <div className="absolute -top-1.5 left-0 right-0 flex justify-around px-4">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-white rounded-full" />
                    ))}
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button
                className="w-full mt-8 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-zinc-900 text-white hover:bg-emerald-900"
                onClick={handleCheckout}
              >
                <Truck className="w-4 h-4" />
                Beli Sekarang
              </button>

              <p className="text-center text-[10px] text-zinc-400 mt-4 font-mono uppercase tracking-widest">
                Safe & Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
