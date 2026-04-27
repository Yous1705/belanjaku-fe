"use client";
import { getOrderDetailApi } from "@/api/services/transaction/transaction.services";
import { OrderDetailType } from "@/type/order.type";
import {
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  Clock,
  CreditCard,
  MapPin,
  MessagesSquare,
  Package,
  ShoppingBag,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function OrderPage() {
  const param = useParams();
  const id = Number(param.id);
  const [order, setOrder] = useState<OrderDetailType>();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getOrderDetailApi(id).then(setOrder).catch(console.error);
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  const isCompleted =
    order.status.toLowerCase() === "completed" ||
    order.status.toLowerCase() === "selesai";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    // Panggil API submit review Anda di sini
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Detail Pesanan
            </h1>
          </div>

          <div
            className={`px-4 py-2 rounded-full border flex items-center gap-2 w-fit ${
              isCompleted
                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                : "bg-amber-50 border-amber-100 text-amber-700"
            }`}
          >
            {isCompleted ? <CheckCircle size={18} /> : <Clock size={18} />}
            <span className="text-sm font-bold uppercase tracking-wider">
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Produk & Pengiriman */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daftar Item */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <ShoppingBag size={20} className="text-blue-500" />
                  Produk yang Dibeli
                </h3>
                <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-500">
                  {order.items.length} Item
                </span>
              </div>
              <div className="divide-y divide-slate-50">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="w-24 h-24 bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                      {/* Ganti dengan <img src={item.product.imageUrl} /> jika ada */}
                      <Package className="text-slate-300" size={32} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 px-2 py-0.5 bg-blue-50 rounded-full">
                            {item.product.category.name}
                          </span>
                          <h4 className="font-bold text-lg text-slate-800 mt-1">
                            {item.product.name}
                          </h4>
                        </div>
                        <p className="font-black text-slate-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {item.product.description}
                      </p>
                      <p className="text-xs font-medium text-slate-400">
                        Kuantitas:{" "}
                        <span className="text-slate-600">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informasi Pengiriman */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-slate-800">
                <MapPin size={20} className="text-blue-500" />
                Alamat Pengiriman
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Penerima
                  </p>
                  <p className="font-bold text-slate-800 text-lg">
                    {order.shippingRecipientName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Alamat Lengkap
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {order.shippingAddress}, {order.shippingCity},{" "}
                    {order.shippingPostal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Summary & Review */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-slate-900 text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-400" />
                Ringkasan Pembayaran
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Biaya Layanan</span>
                  <span className="text-white font-medium">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                  <span className="font-bold text-sm">Total Tagihan</span>
                  <span className="text-2xl font-black text-blue-400">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* REVIEW SECTION */}
            <div
              className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                isCompleted
                  ? "bg-white border-slate-100 shadow-sm"
                  : "bg-slate-100 border-dashed border-slate-200 opacity-80"
              }`}
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <MessagesSquare
                    size={18}
                    className={isCompleted ? "text-blue-500" : "text-slate-400"}
                  />
                  Ulasan Produk
                </h3>
              </div>

              <div className="p-6">
                {isCompleted ? (
                  isSubmitted ? (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="font-bold text-slate-800">
                        Ulasan Terkirim!
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Terima kasih atas feedback Anda.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              size={28}
                              className={`${
                                star <= (hoverRating || rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Bagaimana kualitas produk ini?"
                        className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px]"
                      />
                      <button
                        type="submit"
                        disabled={rating === 0}
                        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                          rating > 0
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Kirim Ulasan
                      </button>
                    </form>
                  )
                ) : (
                  <div className="text-center py-6">
                    <AlertCircle
                      className="mx-auto text-slate-300 mb-2"
                      size={32}
                    />
                    <p className="text-sm font-bold text-slate-500">
                      Ulasan Belum Tersedia
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 px-4">
                      Selesaikan pesanan Anda untuk membuka fitur ulasan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
