import { ProductCardProps, ProductTypeDashboard } from "@/type/product.type";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, ShoppingCart } from "lucide-react";

function ProductCard({
  name,
  description,
  price,
  images,
  category,
}: ProductCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={images?.[0] || "/images/image.jpg"}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = "/images/image.jpg";
        }}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge
            variant="secondary"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {category.name}
          </Badge>
        </CardAction>
        <CardTitle className="line-clamp-1 text-xl font-bold">{name}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[3rem] text-sm leading-relaxed">
          {description}
        </CardDescription>
        <CardContent className="px-1 pb-4">
          <span className="text-xl font-bold text-slate-900">
            Rp {price.toLocaleString()}
          </span>
        </CardContent>
      </CardHeader>

      <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-5">
        <Button variant="outline" className="w-full flex gap-2">
          <Eye className="h-4 w-4" /> Detail
        </Button>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 flex gap-2">
          <ShoppingCart className="h-4 w-4" /> Buy
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
