import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { OrderType, PaymentResponseType } from "@/type/order.type";

export async function checkOutCartItem() {
  return apiFetch("/order/checkout-all", {
    method: "POST",
    headers: authHeader(),
  });
}

export async function getCheckOutItemApi(slug: string) {
  return apiFetch<OrderType[]>("/order/pending", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function paymentApi(id: number) {
  return apiFetch<PaymentResponseType>(`/payment/${id}`, {
    method: "POST",
    headers: authHeader(),
  });
}
function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
