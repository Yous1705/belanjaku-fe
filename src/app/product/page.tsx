"use client";
import {
  getProductsApi,
  searchProductApi,
  toggleWishlistApi,
} from "@/api/services/product/product.services";
import { token } from "@/api/token";
import ProductCard from "@/components/layout/ProductCard";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProductTypeDashboard } from "@/type/product.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function dashboardPage() {
  const router = useRouter();
  const handleLogout = () => {
    token.clear();
    router.replace("auth/login");
  };

  const handleToggleWishlist = async (slug: string) => {
    try {
      const response = await toggleWishlistApi(slug);

      // Update state products secara lokal agar UI langsung berubah
      setProducts((prev) =>
        prev.map((p) =>
          p.slug === slug ? { ...p, isWishlisted: response.isWishlisted } : p,
        ),
      );
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
      // Optional: tambahkan toast notification error di sini
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = search
        ? await searchProductApi({ search })
        : await getProductsApi();

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<ProductTypeDashboard[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getProductsApi()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-5xl font-extrabold text-blue-600"> Loading .......</p>
    );
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600"></div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-emerald-600">Belanja</span>
              ku
            </span>
          </div>
          <Link href="/wishlist" className="border-2 px-3 py-3">
            my-wishlist
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-slate-600 md:block">
              Welcome back, <span className="text-slate-900">User!</span>
            </span>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Field>

        {/* Hero Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Our <span className="text-emerald-600">Premium</span> Collections
          </h2>
          <p className="mt-4 max-w-xl text-lg text-slate-500">
            Daftar produk terbaru yang kami kurasi khusus untuk kebutuhan teknis
            dan gaya hidup Anda.
          </p>
        </div>

        {/* Product Grid - Responsive */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              slug={product.slug}
              category={product.category}
              description={product.description}
              price={product.price}
              images={product.images}
              isWishlisted={product.isWishlisted}
              onWishlistToggle={() => handleToggleWishlist(product.slug)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default dashboardPage;
