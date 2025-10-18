import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function StaffFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    vendor_id: "",
  });
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/vendors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendors(response.data.data);
      } catch (error) {
        toast.error("Could not fetch vendors.");
      }
    };
    fetchVendors();

    if (id) {
      const fetchStaff = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/staffs/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { user, vendor } = response.data.data;
          setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            vendor_id: vendor.id,
          });
        } catch (error) {
          toast.error("Could not fetch staff details.");
        }
      };
      fetchStaff();
    }
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/staffs/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Staff member updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/staffs", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Staff member created successfully!");
      }
      navigate("/admin/staff");
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
          {id ? "Edit Staff Member" : "Create New Staff Member"}
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required={!id}
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
          <select
            name="vendor_id"
            value={formData.vendor_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {id ? "Update Staff" : "Save Staff"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffFormPage;
