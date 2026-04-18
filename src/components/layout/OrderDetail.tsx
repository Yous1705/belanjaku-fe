import { OrderItem } from "@/type/order.type";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function OrderDetail({ quantity, price, total, product }: OrderItem) {
  return (
    <Table>
      <TableHeader className="bg-transparent">
        <TableRow className="border-zinc-100 hover:bg-transparent">
          <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
            Product
          </TableHead>
          <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
            Quantity
          </TableHead>
          <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
            Price
          </TableHead>
          <TableHead className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 h-16">
            Price
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="group border-zinc-100 hover:bg-zinc-50/50 transition-colors">
          <TableCell className="font-black text-zinc-900 text-base">
            {product.name}
          </TableCell>
          <TableCell className="font-black text-zinc-900 text-base">
            {price}
          </TableCell>
          <TableCell className="font-black text-zinc-900 text-base">
            {quantity}
          </TableCell>
          <TableCell className="font-black text-zinc-900 text-base">
            {total}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default OrderDetail;
