import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
import BottomNav from "../../components/BottomNav";
import ClientHeader from "../../components/ClientHeader";
import Skeleton from "react-loading-skeleton";

// Skeleton loader for this specific page
const SubscriptionPageSkeleton = () => (
  <div className="space-y-4">
    {[1, 2].map((n) => (
      <div key={n} className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-3">
          <Skeleton height={28} width={200} />
          <Skeleton height={22} width={70} borderRadius={999} />
        </div>
        <div className="space-y-2">
          <Skeleton height={18} width={150} />
          <Skeleton height={18} width={180} />
        </div>
      </div>
    ))}
  </div>
);

function MySubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/subscriptions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubscriptions(response.data.data);
      } catch (error) {
        toast.error("Could not fetch your subscriptions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [token]);

  return (
    <div className="pb-24">
      <ClientHeader title="My Subscriptions" />

      <div className="p-4 space-y-4">
        {loading ? (
          <SubscriptionPageSkeleton />
        ) : subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-gray-800">
                  {sub.plan.name}
                </h2>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    sub.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {sub.status}
                </span>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Services Remaining:</strong> {sub.remaining_services}
                </p>
                <p>
                  <strong>Expires on:</strong>{" "}
                  {new Date(sub.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-16 px-6">
            <FaRegSadTear className="text-5xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Subscriptions Found
            </h2>
            <p className="text-gray-500 mb-6">
              You don't have any active plans yet.
            </p>
            <Link
              to="/plans"
              className="px-6 py-3 font-bold text-white bg-brand-orange rounded-lg hover:opacity-90"
            >
              Browse Plans
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default MySubscriptionsPage;
