export type SenderType = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "BUYER";
  avatar?: string | null;
};

export type MessageType = {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;

  sender: SenderType;
};

export type ConversationType = {
  id: number;
  userId: number;
  createdAt: string;

  user: SenderType;

  messages: MessageType[];
};
