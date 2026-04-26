import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import {
  BuyNowResponseType,
  CheckoutResponseType,
  OrderType,
  PaymentResponseType,
} from "@/type/order.type";

export async function checkOutCartItem(addressId: number) {
  return apiFetch<CheckoutResponseType>("/order/checkout-all", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ addressId }),
  });
}

export async function getCheckOutItemApi() {
  return apiFetch<OrderType[]>("/order/pending", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function buyNow(
  productId: number,
  addressId: number,
  quantity: number,
) {
  return apiFetch<BuyNowResponseType>("/order/buy-now", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ productId, addressId, quantity }),
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
