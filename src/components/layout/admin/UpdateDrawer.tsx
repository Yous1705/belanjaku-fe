"use client";
import { GetProductById } from "@/api/services/admin/product/product.service";
import { updateProductDetailType } from "@/type/admin/admin-product.type";
import { X, Plus, Image as ImageIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function UpdateDrawer({
  id,
  setIsDrawerOpen,
}: {
  id: number;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [product, setProduct] = useState<updateProductDetailType | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    GetProductById(id).then((res) => {
      setProduct(res);
    });
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Fungsi Tambah Gambar ke Array
  const addImage = () => {
    if (newImageUrl.trim() && product) {
      setProduct({ ...product, images: [...product.images, newImageUrl] });
      setNewImageUrl("");
    }
  };

  // Fungsi Hapus Gambar dari Array
  const removeImage = (index: number) => {
    if (product) {
      const updatedImages = product.images.filter((_, i) => i !== index);
      setProduct({ ...product, images: updatedImages });
    }
  };

  if (!product) return null;

  return (
    <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Update Produk</h3>
          <p className="text-xs text-slate-500">
            ID: #{id} - Sesuaikan informasi detail produk.
          </p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form className="flex-1 overflow-y-auto p-6 space-y-6 shadow-inner">
        {/* MULTIPLE IMAGES SECTION */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Galeri Produk ({product.images.length})
          </label>

          {/* Grid Preview Gambar */}
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
              >
                <img
                  src={img || "/images/image.jpg"}
                  alt={`preview-${index}`}
                  onError={(e) => {
                    e.currentTarget.src = "/images/image.jpg";
                  }}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 text-[10px] text-white text-center py-0.5">
                    Utama
                  </div>
                )}
              </div>
            ))}

            {/* Tombol Placeholder jika kosong */}
            {product.images.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                <ImageIcon size={24} className="mb-2" />
                <p className="text-xs">Belum ada gambar</p>
              </div>
            )}
          </div>

          {/* Input Tambah URL Baru */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste URL gambar baru..."
              className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-slate-400"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={addImage}
              className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Nama Produk
            </label>
            <input
              name="name"
              type="text"
              value={product.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Kategori
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none bg-white"
              >
                <option value="Watches">Watches</option>
                <option value="Accessories">Accessories</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Stok
              </label>
              <input
                name="stock"
                type="number"
                value={product.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Harga Jual (Price)
              </label>
              <input
                name="price"
                type="number"
                value={product.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Diskon (%)
              </label>
              <input
                name="discountPercent"
                type="number"
                value={product.discountPercent}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows={4}
              value={product.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none resize-none"
            />
          </div>
        </div>
      </form>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          className="flex-1 px-4 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition-colors"
        >
          Batal
        </button>
        <button
          type="button"
          className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
