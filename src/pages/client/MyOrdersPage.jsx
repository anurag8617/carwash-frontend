import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
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
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-b p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">
                Order #{order.id} - {order.service.name}
              </h2>
              <p>
                Status:{" "}
                <span className="capitalize font-semibold">{order.status}</span>
              </p>
              <p>Price: ${order.price}</p>
            </div>
            {order.payment_status === "unpaid" &&
              order.status !== "cancelled" && (
                <Link
                  to={`/pay/${order.id}`}
                  className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Pay Now
                </Link>
              )}
            <Link
              to={`/pay/${order.id}`}
              className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Pay Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrdersPage;
