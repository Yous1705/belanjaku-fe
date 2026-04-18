import { ProductDetailProps } from "@/type/product.type";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { addItemToChart } from "@/api/services/cart/cart.services";

function ProductDetail({
  name,
  slug,
  description,
  price,
  stock,
  category,
  images,
  reviews,
  specifications,
  currentPrice,
  //   specifications,
}: ProductDetailProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("spec");

  const handleThumbClick = (index: number) => {
    setActiveIdx(index);
    api?.scrollTo(index); // Perintahkan carousel geser ke index ini
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setActiveIdx(api.selectedScrollSnap());
    });
  }, [api]);

  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(Number(rating) * 2) / 2;
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
            <Star size={14} className="text-zinc-200" />
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400 absolute inset-0"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-zinc-200" />);
      }
    }
    return stars;
  };

  const hadnleAddItemToChart = async (slug: string, quantity: number) => {
    try {
      const response = await addItemToChart({ slug, quantity });
    } catch (error) {
      console.error("Gagal menambah keranjang:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        {/* LEFT: IMAGE GALLERY (Industrial Frame) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative group overflow-hidden border border-zinc-100 bg-zinc-50">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={image.url || "/images/image.jpg"}
                        alt={name}
                        onError={(e) => {
                          e.currentTarget.src = "/images/image.jpg";
                        }}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/80 border-none rounded-none h-12 w-12" />
              <CarouselNext className="right-4 bg-white/80 border-none rounded-none h-12 w-12" />
            </Carousel>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbClick(index)}
                className={`relative flex-shrink-0 w-20 h-20 overflow-hidden transition-all duration-300 border ${
                  activeIdx === index
                    ? "border-zinc-900 opacity-100"
                    : "border-transparent opacity-40"
                }`}
              >
                <img
                  src={image.url || "/images/image.jpg"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/image.jpg";
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO (Clean Typography) */}
        <div className="lg:col-span-5 flex flex-col pt-4">
          <div className="space-y-6 mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              {category.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
              {name}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {renderStars(Number(averageRating))}
                </div>
                <span className="text-xs font-black ml-1">{averageRating}</span>
              </div>
              <div className="h-4 w-[1px] bg-zinc-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {reviews.length} Verified Reviews
              </span>
            </div>

            <div className="text-4xl font-black tracking-tighter border-y border-zinc-100 py-8">
              <span className="text-xl font-black text-zinc-900 tracking-tighter">
                Rp {currentPrice.toLocaleString("id-ID")}
              </span>
              {price !== currentPrice && (
                <span className="text-xs text-zinc-300 line-through">
                  Rp {price.toLocaleString("id-ID")}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">
                Description
              </h3>
              <p className="text-zinc-600 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            {/* ACTION AREA */}
            <div className="space-y-6 pt-6 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Quantity
                </span>
                <div className="flex items-center border border-zinc-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                <Button
                  className="col-span-4 h-16 rounded-none bg-zinc-900 text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all"
                  onClick={() => hadnleAddItemToChart(slug, quantity)}
                >
                  <ShoppingCart size={18} className="mr-3" /> Add To Cart
                </Button>
                <Button
                  variant="outline"
                  className="h-16 rounded-none border-zinc-200 hover:bg-zinc-50"
                >
                  <Heart size={20} />
                </Button>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-100">
                <Truck size={20} className="text-zinc-400" strokeWidth={1.5} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-100">
                <ShieldCheck
                  size={20}
                  className="text-zinc-400"
                  strokeWidth={1.5}
                />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  1 Year Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="mt-32">
        <div className="flex gap-12 border-b border-zinc-100">
          {[
            { id: "spec", label: "Specifications" },
            { id: "review", label: `Reviews (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab.id
                  ? "text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900 animate-in fade-in zoom-in duration-300" />
              )}
            </button>
          ))}
        </div>

        <div className="py-20">
          {/* Tab Spesifikasi */}
          {activeTab === "spec" && (
            <div
              key="spec-content"
              className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
              {specifications.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-6 border-b border-zinc-50 hover:bg-zinc-50/50 px-2 transition-colors"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    {item.key}
                  </span>
                  <span className="font-bold text-sm uppercase tracking-tight text-zinc-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Review */}
          {activeTab === "review" && (
            <div
              key="review-content"
              className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  Customer Feedback
                </h3>
                <div className="h-px flex-1 bg-zinc-100" />
              </div>

              {reviews.length > 0 ? (
                reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="pb-8 border-b border-zinc-50 last:border-none"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-0.5">
                        {renderStars(rev.rating)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                        Verified Client
                      </span>
                    </div>
                    <p className="text-zinc-600 font-medium italic leading-relaxed text-lg">
                      "{rev.comment}"
                    </p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      — {rev.createdAt || "Member"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                  No reviews yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
