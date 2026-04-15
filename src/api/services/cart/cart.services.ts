import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { CartItemDto, CartItemType, CartResponse } from "@/type/product.type";

export async function addItemToChart(dto: CartItemDto) {
  return apiFetch<CartItemType>(`/cart/add-item`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(dto),
  });
}

export async function getChartItem() {
  return apiFetch<CartResponse>(`/cart/my-cart`, {
    method: "GET",
    headers: authHeader(),
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
