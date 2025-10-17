// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import ImageCapture from "../components/ImageCompare";

// function Dashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user")); // Get user info

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://127.0.0.1:8000/api/auth/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.clear();
//       toast.success("Logged out successfully!");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout failed. Logging out anyway.");
//       localStorage.clear();
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-full">
//       <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl text-center">
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
//           Welcome, {user?.first_name || "User"}!
//         </h1>
//         <p className="text-lg text-gray-600 mb-8">
//           You have successfully logged in to your dashboard........
//         </p>
//         <button
//           onClick={handleLogout}
//           className="px-8 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaBoxOpen,
  FaClipboardList,
  FaTasks,
  FaUsers,
  FaStore,
} from "react-icons/fa";

// Admin Dashboard Component (Styled with Tailwind)
const AdminDashboard = () => {
  const [stats, setStats] = useState({ vendors: 0, users: 0 });
  const [recentVendors, setRecentVendors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const vendorsRes = await axios.get(
          "http://127.0.0.1:8000/api/vendors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats((prev) => ({ ...prev, vendors: vendorsRes.data.data.length }));
        setRecentVendors(vendorsRes.data.data.slice(0, 5));
      } catch (error) {
        toast.error("Failed to fetch admin data.");
      }
    };
    fetchAdminData();
  }, [token]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
          <FaStore className="text-5xl text-blue-500" />
          <div>
            <h3 className="text-base font-medium text-gray-500">
              Total Vendors
            </h3>
            <p className="text-4xl font-bold text-gray-800">{stats.vendors}</p>
          </div>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
          <FaUsers className="text-5xl text-green-500" />
          <div>
            <h3 className="text-base font-medium text-gray-500">Total Users</h3>
            <p className="text-4xl font-bold text-gray-800">125</p>{" "}
            {/* Placeholder */}
          </div>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
          <FaBoxOpen className="text-5xl text-purple-500" />
          <div>
            <h3 className="text-base font-medium text-gray-500">
              Active Subscriptions
            </h3>
            <p className="text-4xl font-bold text-gray-800">42</p>{" "}
            {/* Placeholder */}
          </div>
        </div>
      </div>
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Recent Vendor Signups
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold">Business Name</th>
                <th className="p-4 font-semibold">Owner Email</th>
                <th className="p-4 font-semibold">Address</th>
              </tr>
            </thead>
            <tbody>
              {recentVendors.map((vendor) => (
                <tr key={vendor.id} className="border-b">
                  <td className="p-4">{vendor.name}</td>
                  <td className="p-4">{vendor.admin?.email || "N/A"}</td>
                  <td className="p-4">{vendor.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Client Dashboard Component (Styled with Tailwind)
const ClientDashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [order, setOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subResponse = await axios.get(
          "http://127.0.0.1:8000/api/subscriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (subResponse.data.data.length > 0) {
          setSubscription(subResponse.data.data[0]);
        }
        const orderResponse = await axios.get(
          "http://127.0.0.1:8000/api/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (orderResponse.data.data.length > 0) {
          setOrder(orderResponse.data.data[0]);
        }
      } catch (error) {
        toast.error("Could not fetch dashboard data.");
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome, {user?.first_name || "User"}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Active Subscription
          </h2>
          {subscription ? (
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {subscription.plan.name}
              </p>
              <p className="mt-2 text-gray-600">
                Remaining Services: {subscription.remaining_services}
              </p>
              <p className="text-gray-600">
                Expires on:{" "}
                {new Date(subscription.end_date).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No active subscriptions.</p>
          )}
        </div>
        {/* Dashboard Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Order
          </h2>
          {order ? (
            <div>
              <p className="text-3xl font-bold text-gray-800">
                #{order.id} - {order.service.name}
              </p>
              <p className="mt-2 text-gray-600">
                Status:{" "}
                <span className="capitalize font-semibold">{order.status}</span>
              </p>
              <p className="text-gray-600">Price: ${order.price}</p>
            </div>
          ) : (
            <p className="text-gray-600">No recent orders.</p>
          )}
        </div>
        {/* Dashboard Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Quick Links
          </h2>
          <div className="flex flex-col space-y-3">
            <Link
              to="/plans"
              className="flex items-center space-x-2 text-blue-600 hover:underline"
            >
              <FaTasks />
              <span>Browse Plans</span>
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center space-x-2 text-blue-600 hover:underline"
            >
              <FaBoxOpen />
              <span>My Subscriptions</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center space-x-2 text-blue-600 hover:underline"
            >
              <FaClipboardList />
              <span>My Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component to switch between roles
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  // The outer div with p-8 was redundant since both components had it.
  // Now it's part of the MainLayout, or you can add it here if needed.
  return user?.role === "admin" ? <AdminDashboard /> : <ClientDashboard />;
}

export default Dashboard;
