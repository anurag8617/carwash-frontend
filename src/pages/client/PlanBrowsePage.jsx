import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PlanBrowsePage() {
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/public/plans",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlans(response.data.data);
      } catch (error) {
        toast.error("Could not fetch plans.");
      }
    };
    fetchPlans();
  }, [token]);

  const handleSubscribe = async (planId) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/subscriptions",
        { plan_id: planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Successfully subscribed to the plan!");
      // Optionally, you could redirect or update the UI
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Browse Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-sm text-gray-500 mb-4">by {plan.vendor.name}</p>
            <p className="text-gray-700 mb-4">{plan.description}</p>
            <div className="mt-auto">
              <p className="text-2xl font-bold mb-2">${plan.price}</p>
              <p className="text-gray-600">
                {plan.service_limit} washes / {plan.duration_days} days
              </p>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanBrowsePage;
