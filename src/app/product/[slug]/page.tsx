"use client";
import React, { useEffect, useState } from "react";
import { PageProps, ProductDetailType } from "@/type/product.type";
import { useParams } from "next/navigation";
import { getProductDetailApi } from "@/api/services/product/product.services";
import ProductDetail from "@/components/layout/ProductDetail";

function DetailPage() {
  const param = useParams();
  const slug = param.slug as string;
  const [product, setProduct] = useState<ProductDetailType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetailApi(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20 selection:bg-zinc-900 selection:text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <ProductDetail
          images={product?.images ?? []}
          category={product?.category ?? { name: "Uncategorized" }}
          name={product?.name ?? "Loading..."}
          slug={product?.slug ?? ""}
          reviews={product?.reviews ?? []}
          price={product?.price ?? 0}
          description={product?.description ?? "no description"}
          stock={product?.stock ?? 0}
          specifications={product?.specifications ?? []}
        />
      </div>
    </div>
  );
}

export default DetailPage;
