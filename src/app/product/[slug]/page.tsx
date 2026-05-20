"use client";
import React, { useEffect, useState } from "react";
import { PageProps, ProductDetailType } from "@/type/product.type";
import { useParams } from "next/navigation";
import { getProductDetailApi } from "@/api/services/product/product.services";
import ProductDetail from "@/components/layout/ProductDetail";
import { useProducts } from "@/hooks/product/useProducts";
import { useProductsDetail } from "@/hooks/product/useProductsDetail";

function DetailPage() {
  const param = useParams();
  const slug = param.slug as string;

  const { loading, error, productDetail } = useProductsDetail(slug);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500 bg-slate-50">
        Loading application...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-rose-500 bg-slate-50">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20 selection:bg-zinc-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <ProductDetail
          images={productDetail?.images ?? []}
          category={productDetail?.category ?? { name: "Uncategorized" }}
          name={productDetail?.name ?? "Loading..."}
          slug={productDetail?.slug ?? ""}
          reviews={productDetail?.reviews ?? []}
          currentPrice={productDetail?.currentPrice ?? 0}
          price={productDetail?.price ?? 0}
          description={productDetail?.description ?? "no description"}
          stock={productDetail?.stock ?? 0}
          specifications={productDetail?.specifications ?? []}
        />
      </div>
    </div>
  );
}

export default DetailPage;
