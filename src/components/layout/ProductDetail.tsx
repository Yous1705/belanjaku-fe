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

function ProductDetail({
  name,
  //   slug,
  description,
  price,
  stock,
  category,
  images,
  reviews,
  specifications,
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

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20">
        <div className="lg:col-span-7">
          <div className="relative group">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 group">
                      <img
                        key={index}
                        src={image.url}
                        alt={`Gambar ${index}`}
                        onError={(e) => {
                          e.currentTarget.src = "/images/image.jpg";
                        }}
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                      />
                      <div className="absolute top-8 right-8">
                        <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-white transition text-slate-600 hover:text-red-500 active:scale-90">
                          <Heart className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
          <div className="flex gap-4 mt-8 overflow-x-auto pb-4 no-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbClick(index)}
                className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
                  activeIdx === index
                    ? "border-black scale-95 ring-4 ring-black/5"
                    : "border-transparent opacity-40 hover:opacity-100"
                }`}
              >
                <img
                  src={image.url}
                  onError={(e) => {
                    e.currentTarget.src = "/images/banner.jpg";
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col ">
          <div className="mb-6">
            <Badge className="bg-slate-100 text-slate-900 border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-4">
              {category.name}
            </Badge>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tighter mb-4 leading-tight">
              {name}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold">
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-current">{averageRating}</Star>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{reviews.length} Ulasan</span>
            </div>
          </div>

          <div className="mb-10">
            <span className="text-4xl font-black tracking-tighter">
              Rp {price.toLocaleString()}
            </span>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                Ringkasan Product
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg font-medium italic">
                {description}
              </p>
            </div>

            <Separator />
            <div className="space-y-6">
              <div className="flex items-center justify-between p-2 pl-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <span className="font-bold text-[10px] uppercase tracking-widest text-slate-400">
                  Jumlah
                </span>
                <div className="flex items-center gap-2 bg-white rounded-full shadow-sm border p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full transition disabled:opacity-10"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-black text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full transition disabled:opacity-10"
                    disabled={quantity >= stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                <Button className="sm:col-span-4 h-16 rounded-[2rem] text-sm font-black tracking-widest uppercase bg-black hover:bg-slate-800 transition-all shadow-xl shadow-black/10">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Tambahkan Ke Tas
                </Button>
                <Button
                  variant="outline"
                  className="h-16 rounded-[2rem] flex items-center justify-center border-2 border-slate-100 hover:border-black transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Kurir
                  </p>
                  <p className="text-xs font-bold">Gratis Ongkir</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-slate-100">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Proteksi
                  </p>
                  <p className="text-xs font-bold">12 Bln Resmi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <div className="flex gap-12 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {[
            { id: "spec", label: "Spesifikasi" },
            { id: "review", label: `Ulasan (${reviews.length})` },
            { id: "discussion", label: "Diskusi" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                activeTab === tab.id
                  ? "text-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="py-16">
          {activeTab === "spec" && (
            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h3 className="text-3xl font-black mb-10 tracking-tighter">
                Detail Product
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-2">
                {specifications.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-6 border-b border-slate-50 group hover:bg-slate-50/50 px-4 transition-all"
                  >
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                      {item.key}
                    </span>
                    <span className="font-bold text-sm text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
