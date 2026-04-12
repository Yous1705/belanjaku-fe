import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { ProductTypeDashboard } from "@/type/product.type";

export async function getProductsApi() {
  return apiFetch<ProductTypeDashboard[]>("/product/all-products", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function searchProductApi(params?: {
  search?: string;
  category?: string;
}) {
  const query = new URLSearchParams();

  if (params?.search) query.append("slug", params.search);
  if (params?.category) query.append("category", params.category);

  const url = `/product/all-products${
    query.toString() ? `?${query.toString()}` : ""
  }`;

  return apiFetch<ProductTypeDashboard[]>(url, {
    method: "GET",
    headers: authHeader(),
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
