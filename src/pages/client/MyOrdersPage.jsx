import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegFrown } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import ClientHeader from "../../components/ClientHeader";
import Skeleton from "react-loading-skeleton";

// Helper to get status color
const getStatusBadge = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Skeleton loader for this specific page
const OrderPageSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((n) => (
      <div key={n} className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Skeleton height={24} width={150} />
            <Skeleton height={14} width={80} className="mt-1" />
          </div>
          <Skeleton height={22} width={70} borderRadius={999} />
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between items-center">
          <Skeleton height={28} width={60} />
          <Skeleton height={36} width={90} borderRadius={6} />
        </div>
      </div>
    ))}
  </div>
);

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Could not fetch your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="pb-24">
      <ClientHeader title="My Orders" />

      <div className="p-4 space-y-4">
        {loading ? (
          <OrderPageSkeleton />
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="font-bold text-lg text-gray-800">
                    {order.service.name}
                  </h2>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t my-3"></div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">
                  ${order.price}
                </p>
                {order.payment_status === "unpaid" &&
                  order.status !== "cancelled" && (
                    <Link
                      to={`/pay/${order.id}`}
                      className="px-4 py-2 font-bold text-white bg-brand-orange rounded-md hover:opacity-90 text-sm"
                    >
                      Pay Now
                    </Link>
                  )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-16">
            <FaRegFrown className="text-5xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Orders Yet
            </h2>
            <p className="text-gray-500">You haven't placed any orders.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default MyOrdersPage;
