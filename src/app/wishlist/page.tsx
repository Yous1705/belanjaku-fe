"use client";
import { getMyWishlistsApi } from "@/api/services/product/product.services";
import { MyWishlistType } from "@/type/product.type";
import React, { useEffect, useState } from "react";

function WishlistPage() {
  const [products, setProducts] = useState<MyWishlistType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMyWishlistsApi()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  });
  return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {product.name}
            {product.price}
            {product.slug}
            {product.category}
            {product.images}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
