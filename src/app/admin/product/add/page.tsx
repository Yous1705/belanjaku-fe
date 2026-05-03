"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  GetCategoryApi,
  AddProductApi,
} from "@/api/services/admin/product/product.service";
import { CategoryType } from "@/type/admin/admin-product.type";
import {
  Plus,
  Trash2,
  Upload,
  Package,
  Info,
  DollarSign,
  Layers,
  ListPlus,
  X,
  ChevronLeft,
} from "lucide-react";

function AddPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    GetCategoryApi().then(setCategories);
  }, []);
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);

      images.forEach((image) => formData.append("images", image));
      formData.append("specifications", JSON.stringify(specifications));

      await AddProductApi(formData);
      alert("Produk berhasil dibuat");

      // Reset Form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImages([]);
      setPreviewImages([]);
      setSpecifications([{ key: "", value: "" }]);
    } catch (error) {
      console.error(error);
      alert("Gagal membuat produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-2 cursor-pointer hover:text-indigo-600 transition-colors">
              <ChevronLeft size={18} />
              <span className="text-sm font-medium">Kembali ke Katalog</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Tambah Produk
            </h1>
            <p className="text-slate-500 mt-1">
              Konfigurasikan detail dan spesifikasi produk baru Anda.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
            >
              Simpan Draft
            </button>
            <button
              form="product-form"
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Memproses..." : "Terbitkan Produk"}
            </button>
          </div>
        </div>

        <form
          id="product-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Information Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Info className="text-indigo-500" size={20} />
                <h2 className="font-semibold text-lg">Detail Utama</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama produk"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Deskripsi Produk
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tulis deskripsi lengkap mengenai fitur dan keunggulan..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Kategori
                    </label>
                    <div className="relative">
                      <select
                        required
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 appearance-none bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Pilih Kategori</option>

                        {categories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <Layers
                        className="absolute right-3 top-3.5 text-slate-400 pointer-events-none"
                        size={18}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Stok Inventaris
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <DollarSign className="text-indigo-500" size={20} />
                <h2 className="font-semibold text-lg">Penetapan Harga</h2>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-semibold text-lg"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <ListPlus className="text-indigo-500" size={20} />
                  <h2 className="font-semibold text-lg">
                    Spesifikasi Tambahan
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <Plus size={16} /> Tambah Atribut
                </button>
              </div>

              <div className="space-y-3">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center animate-in fade-in slide-in-from-top-1"
                  >
                    <input
                      type="text"
                      placeholder="Label (Contoh: Bahan)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 outline-none text-sm bg-slate-50/50"
                      value={spec.key}
                      onChange={(e) =>
                        handleSpecificationChange(index, "key", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Nilai (Contoh: Katun)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 outline-none text-sm"
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "value",
                          e.target.value,
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(index)}
                      className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      disabled={specifications.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content (Right) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Upload className="text-indigo-500" size={20} />
                <h2 className="font-semibold text-lg">Media Produk</h2>
              </div>

              {/* Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="text-indigo-500" size={24} />
                </div>
                <p className="text-sm font-bold text-slate-700">
                  Pilih berkas gambar
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Mendukung format PNG, JPG (Maks. 5MB)
                </p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              {/* Previews Grid */}
              {previewImages.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {previewImages.map((url, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm"
                    >
                      <img
                        src={url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-2 bg-white text-red-500 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Panduan Cepat
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                      1
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Gunakan gambar dengan resolusi minimal 1080px.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                      2
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pastikan deskripsi mencakup detail teknis yang relevan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPage;
