"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import { useAuth } from "../app/context/AuthContext";

const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const agentId = "Eliza";

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const serverPort = 3001;
      const response = await fetch(
        `http://localhost:${serverPort}/${agentId}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: input,
            userId: "user",
            userName: "User",
          }),
        }
      );

      const data = await response.json();
      data.forEach((message: { text: string }) =>
        setMessages((prev) => [
          ...prev,
          { sender: "LibraryManager-AI", text: message.text },
        ])
      );
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput(""); // Clear input after sending
    const { user } = useAuth();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-4 overflow-y-auto">
      {isChatOpen && (
        <div className="flex flex-col h-full w-5/6 overflow-y-auto space-y-4 mt-20">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              {" "}
              <strong
                className={`${
                  msg.sender === "You" ? "hidden" : ""
                } block text-sm opacity-75`}
              >
                {msg.sender}
              </strong>
              <div
                className={`max-w-[75%] px-3 py-1.5 rounded-lg text-white  ${
                  msg.sender === "You"
                    ? "bg-[var(--foreground)] text-right"
                    : "bg-gray-700 text-left"
                }`}
              >
                {msg.text}
              </div>{" "}
              <strong
                className={`block text-sm opacity-75 mr-4 ${
                  msg.sender === "You" ? "" : "hidden"
                }`}
              >
                {msg.sender}
              </strong>
            </div>
          ))}
        </div>
      )}
      {!isChatOpen && (
        <div className="w-full flex flex-col justify-center items-center gap-3">
          {" "}
          <h1>How can I help you with my library today?</h1>
        </div>
      )}{" "}
      <div
        className={` ${
          isChatOpen ? " mb-8" : ""
        } w-1/2 focus-within:bg-gradient-to-r focus-within:from-red-500 focus-within:to-blue-800  p-0.5 rounded-3xl`}
      >
        <div
          className={`
          
        }  w-full px-7  rounded-3xl flex flex-row h-24 bg-gray-800 items-center justify-center`}
        >
          <input
            type="text"
            className="w-full bg-transparent outline-none focus:ring-0"
            placeholder="Ask me anything about books, fines, or library policies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
                setIsChatOpen(true);
              }
            }}
          />
          <button
            className="bg-gradient-to-r from-[var(--foreground)] to-red-900 px-4 py-2 rounded-lg text-red-200 font-semibold flex flex-row gap-2 text-lg justify-center items-center transition-transform duration-300 hover:scale-105"
            onClick={() => {
              sendMessage();
              setIsChatOpen(true); // ✅ Correct way to update state
            }}
          >
            Send <Send />
          </button>
        </div>
      </div>{" "}
      {!isChatOpen && (
        <div className="space-y-2 flex flex-col mt-3 justify-center items-center">
          <div className="flex flex-row gap-2">
            <div className="border border-[var(--foreground)] bg-red-950 rounded-lg px-3 py-1 text-red-300 text-sm font-bold">
              issue computer engineering books
            </div>
            <div className="border border-[var(--foreground)] bg-red-950 rounded-lg px-3 py-1 text-red-300 text-sm font-bold">
              track my books issued
            </div>
            <div className="border border-[var(--foreground)] bg-red-950 rounded-lg px-3 py-1 text-red-300 text-sm font-bold">
              what is the deadline for my issued books
            </div>
          </div>
          <div
            className="border w-fit  border-[var(--foreground)] bg-red-950 rounded-lg px-3 py-1 text-red-300 text-sm font-bold"
            onClick={() => {
              setInput("shadow and wagmi dex arbitrage");
              setIsChatOpen(true);
              sendMessage();
            }}
          >
            suggest me some books
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
