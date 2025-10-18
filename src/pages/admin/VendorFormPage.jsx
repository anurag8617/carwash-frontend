import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VendorFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (id) {
      const fetchVendor = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/vendors/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFormData({
            name: response.data.data.name,
            address: response.data.data.address,
            email: response.data.data.admin.email,
          });
        } catch (error) {
          toast.error("Could not fetch vendor details.");
        }
      };
      fetchVendor();
    }
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/vendors/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Vendor updated successfully!");
      } else {
        await axios.post("http://1.0.0.1:8000/api/vendors", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Vendor created successfully!");
      }
      navigate("/admin/vendors");
    } catch (error) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        toast.error(`Error: ${errorMessages.join(" ")}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Edit Vendor" : "Create New Vendor"}
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Business Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
          <input
            type="email"
            name="email"
            placeholder="Owner's Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
            disabled={id} // Disable email editing for existing vendors
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required={!id} // Only required for new vendors
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
            required={!id}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {id ? "Update Vendor" : "Save Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VendorFormPage;
