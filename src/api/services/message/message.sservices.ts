import { apiFetch } from "@/api/client";
import { token } from "@/api/token";
import { ConversationType, MessageType } from "@/type/message.type";

export async function getMyConversationApi() {
  return apiFetch<ConversationType>("/message/my-conversation", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getMyMessagesApi() {
  return apiFetch<MessageType[]>("/message/my-chat", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getConversationsApi() {
  return apiFetch<ConversationType[]>("/message/conversations", {
    method: "GET",
    headers: authHeader(),
  });
}

export async function getConversationMessagesApi(conversationId: number) {
  return apiFetch<MessageType[]>(`/message/conversation/${conversationId}`, {
    method: "GET",
    headers: authHeader(),
  });
}

function authHeader() {
  return { Authorization: `Bearer ${token.getToken()}` };
}
