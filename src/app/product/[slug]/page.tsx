"use client";
import React, { useEffect, useState } from "react";
import { PageProps, ProductDetailTyep } from "@/type/product.type";
import { useParams } from "next/navigation";
import { getProductDetailApi } from "@/api/services/product/product.services";

function DetailPage() {
  const param = useParams();
  const slug = param.slug as string;
  const [product, setProduct] = useState<ProductDetailTyep>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetailApi(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  });
  return (
    <div className="text-5xl">
      <div>{product?.name}</div>
      <div>{product?.price}</div>
      <div>{product?.stock}</div>
      <div>
        {product?.images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={`Gambar ${index}`}
            style={{ width: "200px", height: "auto" }}
          />
        ))}
      </div>
      <div>{product?.description}</div>
    </div>
  );
}

export default DetailPage;
