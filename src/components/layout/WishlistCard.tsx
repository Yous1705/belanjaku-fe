import React from "react";
import { Card, CardContent } from "../ui/card";
import { MyWishlistProps } from "@/type/product.type";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function WishlistCard({
  name,
  //   slug,
  price,
  category,
  images,
}: MyWishlistProps) {
  return (
    <TableRow className="group border-zinc-100 hover:bg-zinc-50/50 transition-colors">
      <TableCell className="py-6">
        <div className="flex items-center gap-6">
          {/* Gambar Produk: Ukuran sedikit lebih besar & Square */}
          <div className="h-24 w-24 rounded-none overflow-hidden border border-zinc-100 bg-zinc-50 shrink-0">
            <img
              src={images?.[0] || "/images/image.jpg"}
              alt={name}
              onError={(e) => {
                e.currentTarget.src = "/images/image.jpg";
              }}
              className="h-full w-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              {category}
            </span>
            <span className="font-bold text-zinc-900 tracking-tight text-lg">
              {name}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="font-black text-zinc-900 text-base">
        Rp {price.toLocaleString()}
      </TableCell>

      <TableCell className="text-right py-6">
        <div className="flex justify-end items-center gap-4">
          {/* Tombol Hapus: Ghost Style */}
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-none"
            title="Remove item"
          >
            <Trash2 size={18} />
          </Button>

          {/* Tombol Beli: Industrial Black Style */}
          <Button
            className="bg-zinc-900 text-white gap-3 hover:bg-zinc-800 rounded-none h-11 px-6 text-[10px] font-bold uppercase tracking-widest transition-all"
            size="sm"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add To Cart</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default WishlistCard;
