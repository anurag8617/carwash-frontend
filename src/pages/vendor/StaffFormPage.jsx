import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function StaffFormPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/staffs",
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Staff member added successfully!");
      navigate("/vendor/staff");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
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
        <h1 className="text-3xl font-bold mb-6">Add New Staff Member</h1>
        <p className="text-gray-600 mb-4">
          Enter the email address of the user you want to add as staff. They
          must be registered with a 'staff' role.
        </p>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="staff.member@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Staff
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffFormPage;
