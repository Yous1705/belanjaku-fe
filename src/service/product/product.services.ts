import axiosInstance from "@/lib/axios/axios";
import { ProductTypeDashboard } from "@/type/product.type";
import { get } from "http";

export const productService = {
  async getAll(): Promise<ProductTypeDashboard[]> {
    const response = await axiosInstance.get<ProductTypeDashboard[]>(
      "/product/all-products",
    );
    return response.data;
  },

  async toggleWishlist(slug: string) {
    const response = await axiosInstance.post(`/wishlist/toggle/${slug}`);
    return response.data;
  },

  async getHitsProduct(): Promise<ProductTypeDashboard[]> {
    const response = await axiosInstance.get<ProductTypeDashboard[]>(
      "/product/hits-product",
    );
    return response.data;
  },

  async getProductDetail(slug: string) {
    const response = await axiosInstance.get(`/product/product-detail/${slug}`);
    return response.data;
  },
};
