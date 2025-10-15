import React from "react";
import { Link } from "react-router-dom";

function VendorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Vendor Dashboard
        </h1>
        <p className="font-semibold text-gray-800 mb-4">
          Welcome, {user?.first_name}!
        </p>

        <div className="grid grid-cols-1">
          <div className="p-2 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Manage Your Services</h2>
            <p className="mb-4">Add, edit, or remove your car wash services.</p>
            <Link
              to="/vendor/services"
              className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Go to Services
            </Link>
          </div>
          {/* Add more cards here for Staff Management, Bookings, etc. */}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
