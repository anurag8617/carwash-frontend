import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user info

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Logging out anyway.");
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome, {user?.first_name || "User"}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You have successfully logged in to your dashboard.
        </p>
        <button
          onClick={handleLogout}
          className="px-8 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
