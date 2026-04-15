"use client";
import {
  getHitsApi,
  getProductsApi,
  searchProductApi,
  toggleWishlistApi,
} from "@/api/services/product/product.services";
import { token } from "@/api/token";
import ProductCard from "@/components/layout/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProductTypeDashboard } from "@/type/product.type";
import {
  ArrowUpDown,
  Filter,
  Flame,
  LayoutGrid,
  List,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ProductPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Semua");
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
  const [hitsProduct, setHitsProduct] = useState<ProductTypeDashboard[]>([]);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "Semua" || p.category === activeCategory;
      return matchCategory;
    });
  }, [activeCategory, products]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories);
  }, [products]);

  useEffect(() => {
    getProductsApi()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getHitsApi()
      .then(setHitsProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-5xl font-extrabold text-blue-600"> Loading .......</p>
    );
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* HEADER: Ultra-minimalist */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex h-20 items-center justify-between">
          <a href="/" className="text-xl font-black tracking-[0.4em] uppercase">
            VANTAGE
          </a>

          <div className="flex items-center gap-10">
            <Link
              href="/wishlist"
              className="hidden lg:block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors"
            >
              Collections
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="relative p-2 rounded-full hover:bg-zinc-100"
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] text-white font-bold">
                  2
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-32">
        {/* HERO SECTION: Industrial Luxe (Pas untuk General Store) */}
        <section className="relative h-[600px] w-full overflow-hidden rounded-[2rem] bg-zinc-50 border border-zinc-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#e4e4e7_0%,transparent_50%)]" />

          <div className="relative z-10 flex h-full flex-col justify-center space-y-8 px-12 md:px-20 max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Latest Innovation
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter text-zinc-900 uppercase">
              Curated <br /> <span className="text-zinc-300">Excellence.</span>
            </h1>
            <p className="max-w-md text-lg font-medium text-zinc-500 leading-relaxed">
              Koleksi perangkat dan kebutuhan gaya hidup yang dikurasi dengan
              presisi tinggi untuk standar hidup masa kini.
            </p>
            <Button className="w-fit bg-zinc-900 text-white hover:bg-zinc-800 rounded-none h-14 px-12 text-xs font-bold uppercase tracking-[0.3em] transition-all">
              Discover All
            </Button>
          </div>
        </section>

        {/* SECTION: Trending (Horizontal Scroll) */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-zinc-100 px-8 py-20 ring-1 ring-zinc-200/60 shadow-inner">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                  </span>
                  Trending Now
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase lg:text-5xl">
                  Hot Picks <span className="text-zinc-400">Selection</span>
                </h2>
                <p className="max-w-md text-zinc-500 font-semibold uppercase text-[11px] tracking-widest">
                  Koleksi produk yang paling diminati bulan ini.
                </p>
              </div>
            </div>

            <Carousel
              opts={{ align: "start", loop: true }}
              className="relative w-full"
            >
              <CarouselContent className="-ml-6">
                {hitsProduct.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="h-full transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
                      {/* MEMANGGIL PRODUCT CARD DENGAN DATA EKSPLISIT */}
                      <ProductCard
                        name={product.name}
                        slug={product.slug}
                        category={product.category}
                        description={product.description}
                        price={product.price}
                        displayPrice={product.displayPrice}
                        images={product.images}
                        isWishlisted={product.isWishlisted}
                        onWishlistToggle={() =>
                          handleToggleWishlist(product.slug)
                        }
                        reviews={
                          product?.reviews && product.reviews.length > 0
                            ? {
                                rating:
                                  product.reviews.reduce(
                                    (sum, r) => sum + r.rating,
                                    0,
                                  ) / product.reviews.length,
                              }
                            : { rating: 4.7 }
                        }
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-12 flex justify-center gap-4 md:absolute md:-top-24 md:right-0">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-none border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all" />
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-none border-zinc-300 bg-white hover:bg-zinc-900 hover:text-white transition-all" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* SECTION: Main Catalog */}
        <section className="space-y-12 bg-zinc-100 rounded-[2.5rem] px-8 py-20 ring-1 ring-zinc-200/60">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-t border-zinc-100 pt-12">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
              <button
                onClick={() => setActiveCategory("Semua")}
                className={`relative px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === "Semua"
                    ? "text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                All Products
                {/* Animasi Garis Bawah yang Bergeser */}
                {activeCategory === "Semua" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 transition-all duration-500 animate-in fade-in zoom-in" />
                )}
              </button>

              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === category
                      ? "text-zinc-900"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 transition-all duration-500 animate-in fade-in zoom-in" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Produk dengan Animasi Masuk */}
          <div
            key={activeCategory} // Critical: Memicu re-render untuk animasi
            className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forward"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="transition-all duration-500 hover:-translate-y-2"
                >
                  <ProductCard
                    name={product.name}
                    slug={product.slug}
                    category={product.category}
                    description={product.description}
                    price={product.price}
                    displayPrice={product.displayPrice}
                    images={product.images}
                    isWishlisted={product.isWishlisted}
                    onWishlistToggle={() => handleToggleWishlist(product.slug)}
                    reviews={
                      product?.reviews && product.reviews.length > 0
                        ? {
                            rating:
                              product.reviews.reduce(
                                (sum, r) => sum + r.rating,
                                0,
                              ) / product.reviews.length,
                          }
                        : { rating: 4.7 }
                    }
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center animate-in fade-in duration-1000">
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                  No products found in this collection.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-40 bg-zinc-900 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black tracking-[0.5em] uppercase mb-8">
            VANTAGE
          </h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">
            Built for the modern world © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ProductPage;
