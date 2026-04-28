"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import {
  getConversationMessagesApi,
  getConversationsApi,
} from "@/api/services/message/message.sservices";

import { ConversationType, MessageType } from "@/type/message.type";

import { token } from "@/api/token";

export default function AdminChatPage() {
  const socketRef = useRef<Socket | null>(null);

  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const [selectedConversation, setSelectedConversation] = useState<number>();

  const [messages, setMessages] = useState<MessageType[]>([]);

  const [content, setContent] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const data = await getConversationsApi();

        setConversations(data);

        const socket = io("http://localhost:3000", {
          transports: ["websocket"],
          auth: {
            token: token.getToken(),
          },
          withCredentials: true,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("admin socket connected");
        });

        socket.on("message", (message: MessageType) => {
          setMessages((prev) => [...prev, message]);
        });

        socket.on("disconnect", (reason) => {
          console.log(reason);
        });
      } catch (error) {
        console.log(error);
      }
    }

    init();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  async function handleSelectConversation(conversationId: number) {
    setSelectedConversation(conversationId);

    const chats = await getConversationMessagesApi(conversationId);

    setMessages(chats);

    socketRef.current?.emit("joinRoom", {
      conversationId,
    });
  }

  function handleSendMessage() {
    if (!content.trim() || !selectedConversation) return;

    socketRef.current?.emit("sendMessage", {
      conversationId: selectedConversation,
      content,
    });

    setContent("");
  }

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <div className="w-[300px] border-r overflow-y-auto">
        <div className="p-4 border-b font-bold text-xl">Conversations</div>

        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation.id)}
            className="w-full text-left p-4 border-b hover:bg-gray-100"
          >
            <p className="font-semibold">{conversation.user.name}</p>

            <p className="text-sm text-gray-500">{conversation.user.email}</p>

            {conversation.messages[0] && (
              <p className="text-sm mt-1 truncate">
                {conversation.messages[0].content}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* CHAT */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 font-bold text-xl">Admin Chat</div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[70%] p-3 rounded ${
                message.sender.role === "ADMIN"
                  ? "ml-auto bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {message.sender.name}
              </p>

              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type message..."
            className="border px-3 py-2 rounded w-full"
          />

          <button
            onClick={handleSendMessage}
            className="bg-black text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
