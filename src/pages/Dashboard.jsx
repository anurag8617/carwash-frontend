// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   FaBoxOpen,
//   FaClipboardList,
//   FaTasks,
//   FaUsers,
//   FaStore,
// } from "react-icons/fa";

// // Admin Dashboard Component (Styled with Tailwind)
// const AdminDashboard = () => {
//   const [stats, setStats] = useState({ vendors: 0, users: 0 });
//   const [recentVendors, setRecentVendors] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const vendorsRes = await axios.get(
//           "http://127.0.0.1:8000/api/vendors",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setStats((prev) => ({ ...prev, vendors: vendorsRes.data.data.length }));
//         setRecentVendors(vendorsRes.data.data.slice(0, 5));
//       } catch (error) {
//         toast.error("Failed to fetch admin data.");
//       }
//     };
//     fetchAdminData();
//   }, [token]);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* Stat Card 1 */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
//           <FaStore className="text-5xl text-blue-500" />
//           <div>
//             <h3 className="text-base font-medium text-gray-500">
//               Total Vendors
//             </h3>
//             <p className="text-4xl font-bold text-gray-800">{stats.vendors}</p>
//           </div>
//         </div>
//         {/* Stat Card 2 */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
//           <FaUsers className="text-5xl text-green-500" />
//           <div>
//             <h3 className="text-base font-medium text-gray-500">Total Users</h3>
//             <p className="text-4xl font-bold text-gray-800">125</p>{" "}
//             {/* Placeholder */}
//           </div>
//         </div>
//         {/* Stat Card 3 */}
//         <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2">
//           <FaBoxOpen className="text-5xl text-purple-500" />
//           <div>
//             <h3 className="text-base font-medium text-gray-500">
//               Active Subscriptions
//             </h3>
//             <p className="text-4xl font-bold text-gray-800">42</p>{" "}
//             {/* Placeholder */}
//           </div>
//         </div>
//       </div>
//       <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Recent Vendor Signups
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="p-4 font-semibold">Business Name</th>
//                 <th className="p-4 font-semibold">Owner Email</th>
//                 <th className="p-4 font-semibold">Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentVendors.map((vendor) => (
//                 <tr key={vendor.id} className="border-b">
//                   <td className="p-4">{vendor.name}</td>
//                   <td className="p-4">{vendor.admin?.email || "N/A"}</td>
//                   <td className="p-4">{vendor.address}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Client Dashboard Component (Styled with Tailwind)
// const ClientDashboard = () => {
//   const [subscription, setSubscription] = useState(null);
//   const [order, setOrder] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const subResponse = await axios.get(
//           "http://127.0.0.1:8000/api/subscriptions",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (subResponse.data.data.length > 0) {
//           setSubscription(subResponse.data.data[0]);
//         }
//         const orderResponse = await axios.get(
//           "http://127.0.0.1:8000/api/orders",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (orderResponse.data.data.length > 0) {
//           setOrder(orderResponse.data.data[0]);
//         }
//       } catch (error) {
//         toast.error("Could not fetch dashboard data.");
//       }
//     };
//     fetchData();
//   }, [token]);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         Welcome, {user?.first_name || "User"}!
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Dashboard Card 1 */}
//         <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Active Subscription
//           </h2>
//           {subscription ? (
//             <div>
//               <p className="text-3xl font-bold text-gray-800">
//                 {subscription.plan.name}
//               </p>
//               <p className="mt-2 text-gray-600">
//                 Remaining Services: {subscription.remaining_services}
//               </p>
//               <p className="text-gray-600">
//                 Expires on:{" "}
//                 {new Date(subscription.end_date).toLocaleDateString()}
//               </p>
//             </div>
//           ) : (
//             <p className="text-gray-600">No active subscriptions.</p>
//           )}
//         </div>
//         {/* Dashboard Card 2 */}
//         <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Recent Order
//           </h2>
//           {order ? (
//             <div>
//               <p className="text-3xl font-bold text-gray-800">
//                 #{order.id} - {order.service.name}
//               </p>
//               <p className="mt-2 text-gray-600">
//                 Status:{" "}
//                 <span className="capitalize font-semibold">{order.status}</span>
//               </p>
//               <p className="text-gray-600">Price: ${order.price}</p>
//             </div>
//           ) : (
//             <p className="text-gray-600">No recent orders.</p>
//           )}
//         </div>
//         {/* Dashboard Card 3 */}
//         <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Quick Links
//           </h2>
//           <div className="flex flex-col space-y-3">
//             <Link
//               to="/plans"
//               className="flex items-center space-x-2 text-blue-600 hover:underline"
//             >
//               <FaTasks />
//               <span>Browse Plans</span>
//             </Link>
//             <Link
//               to="/subscriptions"
//               className="flex items-center space-x-2 text-blue-600 hover:underline"
//             >
//               <FaBoxOpen />
//               <span>My Subscriptions</span>
//             </Link>
//             <Link
//               to="/orders"
//               className="flex items-center space-x-2 text-blue-600 hover:underline"
//             >
//               <FaClipboardList />
//               <span>My Orders</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Dashboard Component to switch between roles
// function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   // The outer div with p-8 was redundant since both components had it.
//   // Now it's part of the MainLayout, or you can add it here if needed.
//   return user?.role === "admin" ? <AdminDashboard /> : <ClientDashboard />;
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

import {
  FaBoxOpen,
  FaClipboardList,
  FaTasks,
  FaUsers,
  FaStore,
} from "react-icons/fa";

// Import the new components
import PromoSlider from "../components/PromoSlider";
import BottomNav from "../components/BottomNav";
import StatCard from "../components/StatCard";

// Admin Dashboard Component (Refreshed Design)
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    vendors: 0,
    users: 0,
    subscriptions: 0,
  });
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
        // You would also fetch users and subscriptions count here
      } catch (error) {
        toast.error("Failed to fetch admin data.");
      }
    };
    fetchAdminData();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          icon={FaStore}
          label="Total Vendors"
          value={stats.vendors}
          colorClass="bg-brand-blue"
        />
        <StatCard
          icon={FaUsers}
          label="Total Users"
          value={125}
          colorClass="bg-green-500"
        />
        <StatCard
          icon={FaBoxOpen}
          label="Active Subscriptions"
          value={42}
          colorClass="bg-purple-500"
        />
      </div>
      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Recent Vendor Signups
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 font-semibold text-gray-800 dark:text-gray-300">
                  Business Name
                </th>
                <th className="p-4 font-semibold text-gray-800 dark:text-gray-300">
                  Owner Email
                </th>
                <th className="p-4 font-semibold text-gray-800 dark:text-gray-300">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {recentVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4 text-gray-800 dark:text-gray-300">
                    {vendor.name}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-300">
                    {vendor.admin?.email || "N/A"}
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-300">
                    {vendor.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Client Dashboard Component (New Mobile-First Design)
const ClientDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate 1.5 second load time
    return () => clearTimeout(timer);
  }, []);

  return (
    // MODIFIED: Removed `min-h-screen bg-gray-50` as the new ClientLayout handles it.
    // The `pb-24` remains to prevent content from hiding behind the BottomNav.
    <div className="pb-24">
      {/* Header */}
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back,
          </p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user?.first_name || "User"}!
          </h1>
        </div>
        {/* Placeholder for a profile picture or icon */}
        <div className="w-12 h-12 bg-brand-blue rounded-full text-white flex items-center justify-center font-bold text-xl">
          {user?.first_name?.[0] || "U"}
        </div>
      </div>

      {/* Promo Slider */}
      <div className="px-4 sm:px-6">
        <PromoSlider />
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Your Activity
        </h2>
        {/* Your cards for Active Subscription and Recent Order can go here */}
        {/* Example card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
            Active Subscription
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            Premium Plan
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Expires on: Dec 31, 2025
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
            Recent Order
          </h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            #1234 - Laundry
          </p>
          <p className="mt-2 text-green-600 font-semibold">Status: Completed</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

// Main Dashboard Component to switch between roles
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  // This logic correctly switches the content. The layout is handled by the router now.
  return user?.role === "admin" ? <AdminDashboard /> : <ClientDashboard />;
}

export default Dashboard; 
