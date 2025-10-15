import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MySubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
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
      }
    };
    fetchSubscriptions();
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Subscriptions</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {subscriptions.length === 0 ? (
          <p>You do not have any active subscriptions.</p>
        ) : (
          <ul className="space-y-4">
            {subscriptions.map((sub) => (
              <li key={sub.id} className="p-4 border rounded-md">
                <h2 className="font-bold">{sub.plan.name}</h2>
                <p>
                  Status:{" "}
                  <span className="capitalize font-semibold">{sub.status}</span>
                </p>
                <p>Remaining Services: {sub.remaining_services}</p>
                <p>Expires on: {new Date(sub.end_date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MySubscriptionsPage;
