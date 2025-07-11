// Header Component
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import { getCurrentUser } from "../feature/user/userThunks";
import Logo from "../assets/e18e014e-98af-4f3d-b93d-9113c64c4aff.jpeg";

function Header() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log("User in Header:", user);
  return (
    <header className="sticky top-0 bg-white bg-opacity-95 backdrop-blur border-b border-gray-200 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">
              <img src={Logo} alt="" />
            </span>
          </div>
          <span className="text-xl font-bold text-blue-600">MoodMate</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 bg-gray-50 rounded-full px-6 py-2">
          <a href="#problem" className="text-gray-600 hover:text-gray-900">
            The Problem
          </a>
          <a href="#solution" className="text-gray-600 hover:text-gray-900">
            The Solution
          </a>
          <a href="#integrations" className="text-gray-600 hover:text-gray-900">
            Integrations
          </a>
          <a href="#video" className="text-gray-600 hover:text-gray-900">
            How-to video
          </a>
        </nav>
        <div>
          {/* Authenticated User or Signup */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3 px-2 bg-blue-900/5 hover:bg-blue-900/10 p-1 rounded-md">
              <div className="text-sm hidden sm:flex flex-col">
                <span className="font-semibold text-[13.2px]">
                  {user.fullName}
                </span>
                <div className="flex text-[10px]">
                  <span className="w-10 truncate">
                    {user.email?.split("@")[0]}
                  </span>
                  <span>@{user.email?.split("@")[1]}</span>
                </div>
              </div>
              <div className="rounded-full overflow-hidden cursor-pointer">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt="" width={35} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      {user.fullName.split(" ")[0]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-semibold"
              >
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  className="cursor-pointer"
                >
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <i className="fas fa-bars" />
        </button>
      </div>
    </header>
  );
}

export default Header;
