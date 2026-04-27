import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { ReviewDto } from "@/type/review.type";

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
function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
