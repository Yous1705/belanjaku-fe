"use client";
import { productService } from "@/service/product/product.services";
import { ProductDetailType, ProductTypeDashboard } from "@/type/product.type";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ProductContextType {
  products: ProductTypeDashboard[];
  productDetail: ProductDetailType | null;
  hitProducts: ProductTypeDashboard[];
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchHitsProduct: () => Promise<void>;
  fetchProductDetail: (slug: string) => Promise<void>;
  wishlistToggle: (slug: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<ProductTypeDashboard[]>([]);
  const [productDetail, setProductDetail] = useState<ProductDetailType | null>(
    null,
  );
  const [hitProducts, setHitProducts] = useState<ProductTypeDashboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await productService.getAll();

      setProducts(result);
    } catch (error) {
      setError("Failed to fetch products");
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHitsProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.getHitsProduct();
      setHitProducts(result);
    } catch (error) {
      setError("Failed to fetch hits products");
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetail = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await productService.getProductDetail(slug);
      setProductDetail(result);
    } catch (error) {
      setError("Failed to fetch product detail");
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const wishlistToggle = async (slug: string) => {
    try {
      const response = await productService.toggleWishlist(slug);
      setProducts((prev) =>
        prev.map((p) =>
          p.slug === slug ? { ...p, isWishlisted: response.isWishlisted } : p,
        ),
      );
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchHitsProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        hitProducts,
        productDetail,
        loading,
        error,
        fetchProducts,
        fetchHitsProduct,
        fetchProductDetail,
        wishlistToggle,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
