import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ServiceListPage() {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(response.data.data);
      } catch (error) {
        toast.error("Could not fetch services.");
        console.error(error);
      }
    };
    fetchServices();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(services.filter((s) => s.id !== id));
        toast.success("Service deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete service.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Services</h1>
        <Link
          to="/vendor/services/new"
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          + Add New Service
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Duration (min)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="p-4">{service.name}</td>
                  <td className="p-4">${service.price}</td>
                  <td className="p-4">{service.duration}</td>
                  <td className="p-4">
                    <Link
                      to={`/vendor/services/edit/${service.id}`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
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

export default ServiceListPage;
