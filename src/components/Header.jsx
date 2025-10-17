// src/components/Header.js
import React from "react";
import { Menu, X } from "lucide-react";

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="sticky top-0 bg-white shadow-md p-4 z-20">
      <div className="flex items-center justify-between">
        {/* Hamburger menu for mobile, collapse button for desktop */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 hover:text-purple-600"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1 className="text-lg font-bold text-gray-800">
          Welcome, {user?.first_name || "User"}!
        </h1>
      </div>
    </header>
  );
}
