import {
  AddProductDto,
  CategoryType,
  updateProductDetailType,
} from "./../../../../type/admin/admin-product.type";
import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { ProductType } from "@/type/admin/admin-product.type";

export async function getProductsApi() {
  return apiFetch<ProductType[]>("/product/all-products", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function GetProductById(productId: number) {
  return apiFetch<updateProductDetailType>(`/product/${productId}`, {
    method: "GET",
    headers: authHeader(),
  });
}

export async function GetCategoryApi() {
  return apiFetch<CategoryType[]>("/category/all-categories", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function AddProductApi(formData: FormData) {
  return apiFetch<AddProductDto>("/product/create-product", {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
