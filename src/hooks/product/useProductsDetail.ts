import { useEffect } from "react";
import { useProducts } from "./useProducts";

export function useProductsDetail(slug: string) {
  const { loading, error, productDetail, fetchProductDetail } = useProducts();
  useEffect(() => {
    if (slug) fetchProductDetail(slug);
  }, [slug]);

  return {
    productDetail,
    loading,
    error,
  };
}
