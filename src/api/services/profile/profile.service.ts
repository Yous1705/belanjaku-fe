import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import {
  AddressDto,
  AddressType,
  ProfileOrdertype,
  ProfileType,
} from "@/type/profile.type";

export async function getProfileApi() {
  return apiFetch<ProfileType>("/user/profile", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getProfileOrdersApi() {
  return apiFetch<ProfileOrdertype[]>("/order/my-orders", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getAddressApi() {
  return apiFetch<{ addresses: AddressType[] }>("/user/addresses", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function addAddressApi(dto: AddressDto) {
  return apiFetch("/user/add-addresses", {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(dto),
  });
}

export async function setMainAddressApi(addressId: number) {
  return apiFetch("/user/set-main-address", {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ addressId }),
  });
}

export async function deleteAddressApi(addressId: number) {
  return apiFetch("/user/delete-address", {
    method: "DELETE",
    headers: authHeader(),
    body: JSON.stringify({ addressId }),
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
