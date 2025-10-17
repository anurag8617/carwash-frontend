import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import StaffBottomNav from "./StaffBottomNav";

function StaffProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Logging you out locally.");
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="pb-24">
      {" "}
      {/* Padding for BottomNav */}
      {/* Header */}
      <div className="bg-white p-4 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
      </div>
      {/* User Info Section */}
      <div className="p-6 flex flex-col items-center border-b">
        <FaUserCircle className="text-7xl text-gray-400 mb-3" />
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>
      {/* Logout Button */}
      <div className="p-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-500 text-white font-bold rounded-lg shadow-sm hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
      <StaffBottomNav />
    </div>
  );
}

export default StaffProfilePage;
