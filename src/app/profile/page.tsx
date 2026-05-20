"use client";
import { getMyWishlistsApi } from "@/api/services/product/product.services";
import {
  deleteAddressApi,
  getAddressApi,
  getProfileApi,
  getProfileOrdersApi,
  setFilteredOrdersApi,
  setMainAddressApi,
} from "@/api/services/profile/profile.service";
import { MyReviewApi } from "@/api/services/review/review.services";
import AddAddressCard from "@/components/layout/AddAddressCard";
import UpdateAddressCard from "@/components/layout/UpdateAddressCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MyWishlistType } from "@/type/product.type";
import {
  AddressType,
  ProfileOrdertype,
  ProfileType,
} from "@/type/profile.type";
import { myReviewType } from "@/type/review.type";
import { url } from "inspector";
import {
  Camera,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Plus,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [orders, setOrders] = useState<ProfileOrdertype[]>([]);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [wishlists, setWishlists] = useState<MyWishlistType[]>([]);
  const [reviews, setReviews] = useState<myReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeStatus, setActiveStatus] = useState("ALL");

  const orderStatuses = [
    "ALL",
    "PENDING",
    "PAID",
    "PROCESSING",
    "SHIPPED",
    "COMPLETED",
    "CANCELLED",
  ];

  const menuItem = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Order", icon: Package },
    { id: "addresses", label: "Address", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "reviews", label: "Ulasan", icon: Star },
  ];

  // ======Profile
  useEffect(() => {
    setLoading(true);
    getProfileApi()
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ======Orders
  useEffect(() => {
    setLoading(true);
    getProfileOrdersApi()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  //  ========Wishlist
  useEffect(() => {
    setLoading(true);
    getMyWishlistsApi()
      .then(setWishlists)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ========review
  useEffect(() => {
    setLoading(true);
    MyReviewApi()
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const fetchOrdersByStatus = async () => {
      setLoading(true);
      try {
        if (activeStatus === "ALL") {
          const data = await getProfileOrdersApi();
          setOrders(data);
        } else {
          const data = await setFilteredOrdersApi(activeStatus);
          setOrders(data);
        }
      } catch (error) {
        console.error("Gagal mengambil order:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "orders") {
      fetchOrdersByStatus();
    }
  }, [activeStatus, activeTab]);

  const fetchAddresses = async () => {
    try {
      const res = await getAddressApi();
      setAddresses(res.addresses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSetMain = async (addressId: number) => {
    try {
      const res = await setMainAddressApi(addressId);
      fetchAddresses();
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const res = await deleteAddressApi(addressId);
      fetchAddresses();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-center items-center p-4">
      <main className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <aside className="lg:col-span-1 pt-20">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-100 bg-zinc-50 shadow-inner">
                    <img
                      src={profile?.avatar || "/images/image.jpg"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-zinc-200 rounded-full shadow-sm hover:bg-zinc-50 transition-transform active:scale-95">
                    <Camera size={14} className="text-zinc-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {profile?.name}
                  </h2>
                  <p className="text-xs text-zinc-500">{profile?.email}</p>
                </div>
                <Badge variant="secondary" className="font-bold">
                  {profile?.role}
                </Badge>
              </div>

              <nav className="mt-8 space-y-1">
                {menuItem.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 mt-4 border-t border-zinc-100">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors">
                  <LogOut size={16} />
                  Keluar
                </button>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-2 pt-20">
            <Card className="flex flex-col min-h-[500px]">
              <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50 rounded-t-xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {menuItem.find((m) => m.id === activeTab)?.label}
                </h3>
              </div>

              <div className="p-6 md:p-8 flex-1">
                {/* --- PROFILE TAB --- */}
                {activeTab === "profile" && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-2">
                        <Label>Nama Lengkap</Label>
                        <Input defaultValue={profile?.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input defaultValue={profile?.email} />
                      </div>
                      <div className="space-y-2">
                        <Label>Nomor Telepon</Label>
                        <Input placeholder="+62 812..." />
                      </div>
                      <div className="md:col-span-2 flex justify-end">
                        <Button className="w-full md:w-auto">
                          Simpan Perubahan
                        </Button>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-zinc-100 space-y-6">
                      <h4 className="text-sm font-semibold tracking-tight">
                        Keamanan Akun
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2">
                          <Label>Password Saat Ini</Label>
                          <Input type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label>Password Baru</Label>
                          <Input type="password" />
                        </div>
                        <div className="md:col-span-2">
                          <Button
                            variant="outline"
                            className="w-full md:w-auto"
                          >
                            Perbarui Password
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- ORDERS TAB --- */}
                {activeTab === "orders" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Status Filter Tabs */}
                    <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar">
                      {orderStatuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(status)}
                          className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                            activeStatus === status
                              ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                              : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    {/* Order List */}
                    {loading ? (
                      <p className="text-center py-10 text-zinc-400 animate-pulse">
                        Loading orders...
                      </p>
                    ) : orders.length > 0 ? (
                      orders.map((order, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors"
                        >
                          {/* ... isi card order tetap sama seperti sebelumnya ... */}
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-zinc-100 rounded-md text-zinc-500">
                              <Package size={20} />
                            </div>
                            <div>
                              <p className="text-5xl">{order.id}</p>
                              <p className="text-sm font-bold tracking-tight">
                                {order.orderId}
                              </p>
                              <p className="text-[10px] text-zinc-500 uppercase font-medium">
                                {order.updatedAt}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-4">
                            <div>
                              <p className="text-sm font-bold">
                                Rp {order.totalPrice.toLocaleString()}
                              </p>
                              <Badge
                                variant="secondary"
                                className="text-[10px] py-0"
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-400"
                              onClick={() => router.push(`order/${order.id}`)}
                            >
                              <ChevronRight size={16} />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 bg-zinc-50/50 rounded-xl border border-dashed">
                        <p className="text-sm text-zinc-400 italic">
                          Tidak ada pesanan dengan status {activeStatus}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* --- ADDRESS TAB --- */}
                {activeTab === "addresses" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-zinc-500">
                        Daftar alamat pengiriman Anda
                      </p>

                      <AddAddressCard onSuccess={fetchAddresses} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses && addresses.length > 0 ? (
                        addresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`p-4 rounded-lg border transition-all ${
                              addr.isMain
                                ? "border-emerald-900 bg-emerald-50/50"
                                : "border-emerald-100"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              {addr.isMain && (
                                <Badge
                                  variant="default"
                                  className="text-[9px] px-1.5 py-0"
                                >
                                  UTAMA
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-zinc-900">
                              {addr.address}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {addr.city}, {addr.postal}
                            </p>
                            <div className="mt-4 flex gap-4 pt-3 border-t pt-2">
                              <UpdateAddressCard
                                id={addr.id}
                                onSuccess={fetchAddresses}
                              />
                              {!addr.isMain && (
                                <button
                                  className="text-[10px] font-bold uppercase text-zinc-400 border px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 hover:text-zinc-900"
                                  onClick={() => handleSetMain(addr.id)}
                                >
                                  Set Utama
                                </button>
                              )}
                              <button
                                className="text-[10px] font-bold uppercase  ml-auto bg-rose-100 py-1 px-3 hover:bg-rose-200"
                                onClick={() => handleDeleteAddress(addr.id)}
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 md:col-span-2">
                          <p className="text-sm text-zinc-500">
                            Anda belum memiliki alamat pengiriman.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* --- WISHLIST TAB --- */}
                {activeTab === "wishlist" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
                    {wishlists.map((item) => (
                      <div
                        key={item.id}
                        className="group flex gap-4 p-3 border border-zinc-100 rounded-xl hover:shadow-sm transition-all bg-zinc-50/30"
                      >
                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                          <img
                            src={item.images || "/images/image.jpg"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h5 className="text-sm font-bold leading-tight line-clamp-1">
                              {item.name}
                            </h5>
                            <p className="text-xs font-black mt-1 text-zinc-900">
                              Rp {item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-[10px] font-bold"
                              onClick={() =>
                                router.push(
                                  `/checkout?slug=${item.slug}&quantity=1`,
                                )
                              }
                            >
                              Beli
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-zinc-400 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* --- REVIEWS TAB --- */}
                {activeTab === "reviews" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
                    {reviews.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map((item) => (
                          <div
                            key={item.id}
                            className="group relative bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                          >
                            <div>
                              {/* Header: Product Name & Rating */}
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                                    {item.product.name}
                                  </span>
                                  <h4 className="font-bold text-zinc-900">
                                    {item.user.name}
                                  </h4>
                                </div>
                                <div className="flex items-center bg-zinc-50 px-2 py-1 rounded-lg border border-zinc-100">
                                  <span className="text-sm font-bold text-amber-500 mr-1">
                                    ★
                                  </span>
                                  <span className="text-sm font-medium text-zinc-700">
                                    {item.rating}
                                  </span>
                                </div>
                              </div>

                              {/* Review Comment */}
                              <p className="text-zinc-600 italic text-sm leading-relaxed mb-6">
                                "{item.comment}"
                              </p>
                            </div>

                            {/* Footer: Date */}
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                              <span className="text-[10px] text-zinc-400 font-medium">
                                {new Date(item.updatedAt).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                              <div className="h-1.5 w-1.5 rounded-full bg-zinc-200 group-hover:bg-indigo-400 transition-colors"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-24 bg-zinc-50/50 rounded-3xl border border-dashed border-zinc-200">
                        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                          <svg
                            className="w-8 h-8 text-zinc-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="White-box-icon... 11.042 2 12 2s3.958.858 5 2M7 8h10M7 12h10m-8 4h8"
                            />
                          </svg>
                        </div>
                        <h3 className="text-zinc-900 font-medium">
                          Belum ada ulasan
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1">
                          Review yang Anda berikan akan muncul secara otomatis
                          di sini.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
