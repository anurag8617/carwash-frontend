import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function StaffListPage() {
  const [staff, setStaff] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/staffs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaff(response.data.data);
      } catch (error) {
        toast.error("Could not fetch staff members.");
        console.error(error);
      }
    };
    fetchStaff();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/staffs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaff(staff.filter((s) => s.id !== id));
        toast.success("Staff member removed successfully.");
      } catch (error) {
        toast.error("Failed to remove staff member.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Staff</h1>
        <Link
          to="/vendor/staff/new"
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          + Add New Staff
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff &&
              staff.map((member) => (
                <tr key={member.id} className="border-b">
                  <td className="p-4">{`${member.user.first_name} ${member.user.last_name}`}</td>
                  <td className="p-4">{member.user.email}</td>
                  <td className="p-4 capitalize">{member.status}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
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

export default StaffListPage;
