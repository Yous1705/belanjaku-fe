import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { myReviewType, ReviewDto } from "@/type/review.type";

export async function AddReviewApi(
  productId: number,
  orderId: number,
  dto: ReviewDto,
) {
  return apiFetch(`/review/product/${productId}/order/${orderId}`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(dto),
  });
}

export async function MyReviewApi() {
  return apiFetch<myReviewType[]>("/review/my-review", {
    method: "GET",
    headers: authHeader(),
  });
}
function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
