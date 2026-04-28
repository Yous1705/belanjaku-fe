"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import {
  getMyConversationApi,
  getMyMessagesApi,
} from "@/api/services/message/message.sservices";

import { MessageType } from "@/type/message.type";
import { token } from "@/api/token";

export default function Page() {
  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversationId, setConversationId] = useState<number>();
  const [content, setContent] = useState("");

  useEffect(() => {
    async function initChat() {
      try {
        const conversation = await getMyConversationApi();

        setConversationId(conversation.id);

        const chats = await getMyMessagesApi();

        setMessages(chats);

        const socket = io("http://localhost:3000", {
          transports: ["websocket"],
          auth: {
            token: token.getToken(),
          },
          withCredentials: true,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("socket connected");

          socket.emit("joinRoom", {
            conversationId: conversation.id,
          });
        });

        socket.on("message", (message: MessageType) => {
          setMessages((prev) => [...prev, message]);
        });

        socket.on("connect_error", (err) => {
          console.log("connect error:", err.message);
        });

        socket.on("disconnect", (reason) => {
          console.log("disconnect:", reason);
        });
      } catch (error) {
        console.log(error);
      }
    }

    initChat();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  function handleSendMessage() {
    if (!content.trim() || !conversationId) return;

    socketRef.current?.emit("sendMessage", {
      conversationId,
      content,
    });

    setContent("");
  }

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-bold">Chat Admin</h1>

      <div className="border rounded p-4 h-[400px] overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="border p-2 rounded">
            <p className="font-semibold">{message.sender.name}</p>

            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
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
  );
}
