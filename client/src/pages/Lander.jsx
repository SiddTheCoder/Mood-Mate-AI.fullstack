import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";

export default function Lander() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/chat");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-100 text-gray-800 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-grow text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Wellness starts with understanding
            <br className="hidden md:block" />
            <span className="text-purple-700">
              <TypeAnimation
                sequence={[
                  "Hey there!",
                  1000,
                  "How are you feeling today?",
                  1200,
                  "Let’s talk it out. 💬",
                  1200,
                  "I’m here to listen. 🤗",
                  1200,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: "inline-block", whiteSpace: "pre-line" }}
              />
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Your AI companion for emotional relief, sentiment-aware responses,
            and mood support. Empower your mental space, one message at a time.
          </p>

          <div className="mt-10 flex flex-col items-center space-y-4">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 bg-purple-600 text-white font-semibold rounded px-6 py-3 shadow-lg hover:bg-purple-700 hover:-translate-y-1 transition transform"
            >
              Try for free
            </button>
            <span className="text-sm text-gray-400">
              No credit card required
            </span>
          </div>
        </div>
      </section>

      {/* Optional Dashboard Preview or Feature Teasers */}
      <section className="py-12 bg-white w-full">
        <div className="container mx-auto px-4 bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
          {/* Add preview images or feature bullets here */}
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
            How it helps
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left text-gray-600 text-sm">
            <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
              🌈 Detects your mood and provides uplifting replies
            </li>
            <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
              🧠 Uses sentiment analysis to tailor advice
            </li>
            <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
              💬 Talk freely — it’s private, safe, and empathetic
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-6">
        Powered by{" "}
        <span className="font-semibold text-purple-600">ChromoVerse</span>
      </footer>
    </div>
  );
}
