import { ProductCardProps, ProductTypeDashboard } from "@/type/product.type";
import React, { useState } from "react";
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
import { Eye, Heart, Plus, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function ProductCard({
  name,
  slug,
  description,
  price,
  images,
  category,
  isWishlisted,
  reviews,
  displayPrice,
  onWishlistToggle,
}: ProductCardProps) {
  const router = useRouter();

  // Function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <Star
            key={i}
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />,
        );
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-gray-300" />
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400 absolute inset-0"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden border border-zinc-200 bg-white rounded-none transition-all duration-500 hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <img
          src={images?.[0] || "/images/image.jpg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={onWishlistToggle}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-zinc-900 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Heart
              size={18}
              className={cn(
                "transition-colors",
                isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-600",
              )}
            />
          </button>
        </div>
      </div>

      <CardHeader className="px-6 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
            {category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">{renderStars(reviews.rating)}</div>
            <span className="text-[11px] font-bold text-zinc-700 ml-1">
              {reviews.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <CardTitle className="text-lg font-bold text-zinc-900 line-clamp-1 uppercase tracking-tight">
          {name}
        </CardTitle>

        <CardDescription className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-medium">
          {description}
        </CardDescription>
      </CardHeader>

      <div className="px-6 py-4 border-t border-zinc-50 mt-auto">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-black text-zinc-900 tracking-tighter">
            Rp {displayPrice.toLocaleString()}
          </span>
          {price !== displayPrice && (
            <span className="text-xs text-zinc-300 line-through">
              Rp {price.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <CardFooter className="p-0">
        <Button
          onClick={() => router.push(`/product/${slug}`)}
          className="w-full h-14 bg-zinc-900 text-white hover:bg-zinc-800 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
