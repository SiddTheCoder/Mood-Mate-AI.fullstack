import React, { useState, useRef } from "react";
import { ArrowRight, Smile, BarChart3, Sparkles } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatComponent from "../components/ChatComponent";


export default function ChatPage() {
  
  const { isSideBarCollapsed } = useSelector((state) => state.localState);
 

  // Sidebar width depends on collapse state
  const sidebarWidth = isSideBarCollapsed ? 40 : 120;

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      {/* Sidebar fixed on the left */}
      <Sidebar />

      <div className="flex flex-col w-full h-full">
        <div
          className="h-full overflow-y-auto bg-gray-50 flex-1 flex"
          style={{ marginLeft: sidebarWidth }}
        >
          {/* Main Chat Area (Center) */}
          <main
            className="w-full"
            style={{ marginLeft: sidebarWidth }}
          >
            {/* Mood bubbles */}
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-blue-300 rounded-full filter blur-2xl opacity-30 animate-pulse" />
            <div className="absolute top-1/2 right-10 w-40 h-40 bg-blue-200 rounded-full filter blur-2xl opacity-20 animate-pulse" />
 
            <ChatComponent />

          </main>

          {/* AI Suggestion Panel (Right) */}
          <aside className="w-86 bg-white/80 backdrop-blur-xl shadow-lg p-4 hidden xl:flex flex-col justify-start gap-4 border-l border-blue-100 sticky top-0 h-full">
            <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <Sparkles size={18} /> Suggestions
            </h3>
            <ul className="text-sm space-y-3 text-blue-800">
              <li className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                🌤️ “Even the darkest night will end and the sun will rise.”
              </li>
              <li className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition cursor-pointer">
                🎧 Try this calming lo-fi playlist
              </li>
              <li className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition cursor-pointer">
                🧘 Breath tip: Inhale 4s, hold 4s, exhale 4s
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}