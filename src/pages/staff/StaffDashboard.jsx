import React from "react";
import { Link } from "react-router-dom";
import StaffBottomNav from "./StaffBottomNav";

function StaffDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="pb-24">
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back,
          </p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user?.first_name || "Staff"}!
          </h1>
        </div>
        <div className="w-12 h-12 bg-brand-blue rounded-full text-white flex items-center justify-center font-bold text-xl">
          {user?.first_name?.[0] || "S"}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <Link
            to="/staff/tasks"
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
          >
            <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
              My Tasks
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              View your assigned tasks and update their status.
            </p>
          </Link>
        </div>
      </div>

      <StaffBottomNav />
    </div>
  );
}

export default StaffDashboard;
