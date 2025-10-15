import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PlanListPage() {
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/plans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(response.data.data);
      } catch (error) {
        toast.error("Could not fetch subscription plans.");
        console.error(error);
      }
    };
    fetchPlans();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/plans/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(plans.filter((p) => p.id !== id));
        toast.success("Plan deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete plan.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <Link
          to="/vendor/plans/new"
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          + Add New Plan
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Service Limit</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans &&
              plans.map((plan) => (
                <tr key={plan.id} className="border-b">
                  <td className="p-4">{plan.name}</td>
                  <td className="p-4">${plan.price}</td>
                  <td className="p-4">{plan.duration_days} days</td>
                  <td className="p-4">{plan.service_limit} washes</td>
                  <td className="p-4 capitalize">{plan.status}</td>
                  <td className="p-4">
                    <Link
                      to={`/vendor/plans/edit/${plan.id}`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanListPage;
