"use client";
import { toggleWishlistApi } from "@/api/services/product/product.services";
import ProductCard from "@/components/layout/ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/product/useProducts";
import { ProductTypeDashboard } from "@/type/product.type";
import React, { useState } from "react";

function page() {
  const { error, loading, products } = useProducts();

  // const handleToggleWishlist = async (slug: string) => {
  //     try {
  //       const response = await toggleWishlistApi(slug);

  //       setProducts((prev) =>
  //         prev.map((p) =>
  //           p.slug === slug ? { ...p, isWishlisted: response.isWishlisted } : p,
  //         ),
  //       );
  //     } catch (err) {
  //       console.error("Failed to toggle wishlist", err);
  //     }
  //   };
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      <main className="container mx-auto px-6 py-12 space-y-32">
        <section className="space-y-12 bg-zinc-100 rounded-[2.5rem] px-8 py-20 ring-1 ring-zinc-200/60">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-t border-zinc-100 pt-12">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forward">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="transition-all duration-500 hover:-translate-y-2"
                  >
                    <ProductCard
                      name={item.name}
                      slug={item.slug}
                      category={item.category}
                      description={item.description}
                      price={item.price}
                      displayPrice={item.displayPrice}
                      image={item.image}
                      isWishlisted={item.isWishlisted}
                      // onWishlistToggle={() => handleToggleWishlist(item.slug)}
                      reviews={item.reviews ?? 4}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      {products.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.category}</p>
          <img src={item.image} alt={item.name} />
          <p>{item.reviews.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default page;
