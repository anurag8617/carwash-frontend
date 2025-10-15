import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ServiceFormPage() {
  const { id } = useParams(); // Gets the 'id' from the URL for editing
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    if (id) {
      // If there's an ID, we're editing, so fetch the service data
      const fetchService = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/services/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFormData(response.data.data);
        } catch (error) {
          toast.error("Could not fetch service details.");
        }
      };
      fetchService();
    }
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/services/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Service updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/services", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Service created successfully!");
      }
      navigate("/vendor/services");
    } catch (error) {
      // ** IMPROVED ERROR HANDLING **
      if (error.response && error.response.data && error.response.data.errors) {
        // This handles validation errors from Laravel
        const errorMessages = Object.values(error.response.data.errors).flat();
        toast.error(`Error: ${errorMessages.join(" ")}`);
      } else {
        // This handles other errors like 404, 500, etc.
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error(error); // Keep this for debugging
    }
  };
  return (
    <div className="p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Edit Service" : "Create New Service"}
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Service Description"
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
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {id ? "Update Service" : "Save Service"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceFormPage;
