import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageBacker() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="flex cursor-pointer items-center text-gray-500 hover:text-indigo-600"
    >
      <ChevronLeft className="w-5 h-5 mr-1" />
      Back
    </button>
  );
}

export default PageBacker;
