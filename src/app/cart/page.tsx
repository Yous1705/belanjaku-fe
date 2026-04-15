"use client";
import { getChartItem } from "@/api/services/cart/cart.services";
import { CartItemType, CartResponse } from "@/type/product.type";
import React, { useEffect, useState } from "react";

function CartPage() {
  const [products, setProducts] = useState<CartResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChartItem()
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {products?.items.map((p) => (
        <div>
          {p.product.name}
          {p.product.category.name}
          {p.product.slug}
          {p.quantity}
          {p.currentPrice}
          {p.totalPrice}
        </div>
      ))}
      {products?.grandTotal}
    </div>
  );
}

export default CartPage;
