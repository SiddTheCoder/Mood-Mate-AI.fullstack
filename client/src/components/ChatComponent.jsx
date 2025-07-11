import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import { sendMessageToActiveChat } from "../feature/chat/chatThunks";
import { formatAIResponse } from "./formatAIResponse";

import Logo from "../assets/e18e014e-98af-4f3d-b93d-9113c64c4aff.jpeg";
import { AnimatePresence } from "framer-motion";

export default function ChatComponent() {


  const { currentChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    if (currentChat?.messages) {
      setMessages(currentChat.messages);
    }
  }, [currentChat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage, { role: "loading" }]);
    setInput("");

    try {
      const actionResult = await dispatch(sendMessageToActiveChat(input));
      const newMessages = actionResult?.payload?.chat?.messages;
      const lastMessage = newMessages?.[newMessages.length - 1];

      const response = lastMessage?.content || "AI response...";

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.role !== "loading");
        return [...filtered, { role: "assistant", content: response }];
      });
    } catch (error) {
      console.error("Message send failed", error);
      setMessages((prev) => prev.filter((m) => m.role !== "loading"));
    }
  };

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-purple-100 flex flex-col items-center justify-between pt-12 pb-16 rounded-3xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-2xl">✨</div>
          <h1 className="text-3xl font-semibold text-gray-700">
            Ask <span className="text-blue-700">MoodMate</span> anything
          </h1>
        </div>

        {/* Messages */}
        <div className="w-full max-w-2xl flex flex-col gap-4 px-4 flex-1 overflow-y-auto relative">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-3 rounded-lg text-sm shadow-md ${
                msg.role === "user"
                  ? "self-end bg-white text-gray-800"
                  : msg.role === "assistant"
                  ? "self-start bg-purple-100 text-purple-800"
                  : "self-start bg-gray-100 text-gray-500 animate-pulse"
              }`}
            >
              {msg.role === "loading" ? (
                <img src={Logo} className="w-6 h-6" />
              ) : (
                <AnimatePresence>
                  {formatAIResponse(msg.content)}
                </AnimatePresence>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="w-full max-w-2xl flex items-center gap-2 px-4 mt-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md  rounded-full shadow-lg p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none shadow-sm bg-white"
          />
          <button
            type="submit"
            className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white via-pink-50 to-purple-100 p-4 rounded-3xl">
      <div className="mb-6 text-3xl font-medium text-gray-800 flex flex-col items-center">
        <span className="text-2xl mb-2">✨</span>
        <h1>Ask our MoodMate anything</h1>
      </div>

      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Suggestions on what to ask Our AI
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setInput("Felling Lonely? Lets Talk ");
              handleSend();
            }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            Felling Lonely? Lets Talk 🥰
          </button>
          <button
            onClick={() => {
              setInput("Hey I waanna talk aske about my day buddy .");
              handleSend();
            }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            How was the day Mate?
          </button>
          <button
            onClick={() => {
              setInput(
                "Ask me about What projects should I be concerned about right now?"
              );
              handleSend();
            }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            What projects should I be concerned about right now?
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Ask me anything about your projects"
          className="flex-1 px-4 py-3 focus:outline-none"
        />
        <button className="px-4 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.94 2.94a1.5 1.5 0 012.12 0L17 14.88V6.5a1.5 1.5 0 013 0v10a1.5 1.5 0 01-1.5 1.5h-10a1.5 1.5 0 010-3h8.38L2.94 5.06a1.5 1.5 0 010-2.12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
