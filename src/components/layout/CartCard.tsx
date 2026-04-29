"use client";
import React, { useEffect, useState } from "react";

import { CartItemType } from "@/type/product.type";

import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function CartCard({
  product,
  quantity,
  currentPrice,
  totalPrice,
}: CartItemType) {
  const [cartQuantity, setCartQuantity] = useState(quantity);

  useEffect(() => {
    setCartQuantity(quantity);
  }, [quantity, totalPrice]);

  const handleIncrement = () => {
    const newQuantity = cartQuantity + 1;
    setCartQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(cartQuantity - 1, 1);
    setCartQuantity(newQuantity);
  };

  return (
    <div className="group flex flex-col md:flex-row items-center gap-6 py-8 border-b border-zinc-100 last:border-0">
      {/* Product Image */}
      <div className="relative w-full md:w-40 h-40 bg-zinc-50 overflow-hidden rounded-2xl border border-zinc-100 shrink-0">
        <img
          src={product.images.url || "/images/image.jpg"}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 w-full space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
              {product.category.name}
            </span>
            <h3 className="text-lg font-black tracking-tight uppercase mt-1">
              {product.name}
            </h3>
          </div>
          <button className="text-zinc-300 hover:text-rose-500 transition-colors p-2">
            <Trash2 size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          {/* Quantity Controller */}
          <div className="flex items-center gap-4 bg-zinc-50 w-fit rounded-full px-4 py-2 border border-zinc-100">
            <button
              className="text-zinc-400 hover:text-black transition-colors"
              onClick={handleDecrement}
            >
              <Minus size={14} />
            </button>
            <span className="text-xs font-black w-8 text-center">
              {cartQuantity}
            </span>
            <button
              className="text-zinc-400 hover:text-black transition-colors"
              onClick={handleIncrement}
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price Info */}
          <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Subtotal
            </p>
            <p className="text-md font-black italic tracking-tighter">
              IDR {(currentPrice * cartQuantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
