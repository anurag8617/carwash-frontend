import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PlanFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration_days: "",
    service_limit: "",
  });

  useEffect(() => {
    if (id) {
      const fetchPlan = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/plans/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFormData(response.data.data);
        } catch (error) {
          toast.error("Could not fetch plan details.");
        }
      };
      fetchPlan();
    }
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/plans/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Plan updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/plans", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Plan created successfully!");
      }
      navigate("/vendor/plans");
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        toast.error(`Error: ${errorMessages.join(" ")}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Edit Plan" : "Create New Plan"}
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Plan Name (e.g., Gold Monthly)"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="duration_days"
            placeholder="Duration (in days)"
            value={formData.duration_days}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="service_limit"
            placeholder="Service Limit (e.g., 5 washes)"
            value={formData.service_limit}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {id ? "Update Plan" : "Save Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlanFormPage;
