"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { X, Send } from "lucide-react";
import {
  getMyConversationApi,
  getMyMessagesApi,
} from "@/api/services/message/message.sservices";
import { MessageType } from "@/type/message.type";
import { token } from "@/api/token";

export function ChatDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const socketRef = useRef<Socket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversationId, setConversationId] = useState<number>();
  const [content, setContent] = useState("");
  const [myName, setMyName] = useState<string>("");

  const triggerNotif = () => {
    console.log("Mengirim sinyal pesan baru...");
    window.dispatchEvent(new CustomEvent("newMessageReceived"));
  };

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
      auth: {
        token: token.getToken(),
      },
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected for background notifications");
      // Jika kita sudah punya conversationId (pernah buka chat), join room lagi
      if (conversationId) {
        socket.emit("joinRoom", { conversationId });
      }
    });

    socket.on("message", (message: MessageType) => {
      setMessages((prev) => [...prev, message]);
      const isFromAdmin = message.sender.role === "ADMIN";

      if (isFromAdmin) {
        triggerNotif();
      }
    });

    socket.on("connect_error", (err) => {
      console.log("Connect error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]); // Re-connect jika conversationId berubah atau init pertama kali

  // 2. EFFECT DRAWER: Mengambil data chat hanya saat drawer dibuka
  useEffect(() => {
    if (!isOpen) return;

    async function syncChat() {
      try {
        const conversation = await getMyConversationApi();
        setConversationId(conversation.id);

        const chats = await getMyMessagesApi();
        setMessages(chats);

        // Pastikan socket join room agar menerima pesan dari room ini
        if (socketRef.current) {
          socketRef.current.emit("joinRoom", {
            conversationId: conversation.id,
          });
        }

        const findMyName = chats.find(
          (m: MessageType) => !m.sender.name.toLowerCase().includes("admin"),
        );
        if (findMyName) {
          setMyName(findMyName.sender.name);
        }
      } catch (error) {
        console.log("Sync Chat Error:", error);
      }
    }

    syncChat();
  }, [isOpen]);

  function handleSendMessage() {
    if (!content.trim() || !conversationId) return;
    socketRef.current?.emit("sendMessage", {
      conversationId,
      content,
    });
    setContent("");
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <aside
        data-drawer-open={isOpen} // Marker untuk membantu pengecekan status drawer
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.3em]">
            Vantage Support
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Chat Area (WhatsApp Style) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f0f2f5]">
          {messages.map((message) => {
            const isMe = message.sender.name === myName;

            return (
              <div
                key={message.id}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 shadow-sm relative ${
                    isMe
                      ? "bg-zinc-900 text-white rounded-2xl rounded-tr-none"
                      : "bg-white text-zinc-800 rounded-2xl rounded-tl-none border border-zinc-100"
                  }`}
                >
                  {!isMe && (
                    <p className="text-[9px] font-black uppercase tracking-tighter mb-1 text-zinc-400">
                      {message.sender.name}
                    </p>
                  )}
                  <p className="text-xs font-medium leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-100">
          <div className="flex gap-2 bg-zinc-50 border border-zinc-100 rounded-full pl-5 pr-1 py-1 focus-within:border-zinc-900 transition-all">
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-transparent text-xs font-medium py-3 flex-1 outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-zinc-900 text-white p-2.5 rounded-full hover:bg-black transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
