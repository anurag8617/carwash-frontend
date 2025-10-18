import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AdminStaffListPage() {
  const [staff, setStaff] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/staff",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStaff(response.data.data);
      } catch (error) {
        toast.error("Could not fetch staff members.");
      }
    };
    fetchStaff();
  }, [token]);

  const handleDelete = async (staffId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this staff member? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/staffs/${staffId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaff(staff.filter((member) => member.id !== staffId));
        toast.success("Staff member deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete staff member.");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Staff</h1>
        <Link
          to="/admin/staff/new"
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
              <th className="p-4">Vendor</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="p-4">
                  <Link
                    to={`/admin/staff/view/${member.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {`${member.user.first_name} ${member.user.last_name}`}
                  </Link>
                </td>
                <td className="p-4">{member.user.email}</td>
                <td className="p-4">{member.vendor.name}</td>
                <td className="p-4">
                  <Link
                    to={`/admin/staff/edit/${member.id}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id)}
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

export default AdminStaffListPage;
