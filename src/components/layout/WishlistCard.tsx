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
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg overflow-hidden border border-slate-100 shrink-0">
            <img
              src={images?.[0] || "/images/image.jpg"}
              alt={name}
              onError={(e) => {
                e.currentTarget.src = "/images/image.jpg";
              }}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-semibold text-slate-800 line-clamp-1">
            {name}
          </span>
        </div>
      </TableCell>
      <TableCell className="font-bold text-slate-900">Rp. {price}</TableCell>
      <TableCell>
        <Badge variant="outline" className="w-fit mb-1">
          {category}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end items-center gap-2">
          <Button variant="destructive" size="icon" title="remove item">
            <Trash2 size={18} />
          </Button>
          <Button
            variant="outline"
            className="bg-blue-600 text-white gap-2 hover:bg-blue-700 hover:text-white"
            size="sm"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Beli Sekarang</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default WishlistCard;
