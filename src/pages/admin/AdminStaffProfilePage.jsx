import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AdminStaffProfilePage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/vendors/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVendor(response.data.data);
      } catch (error) {
        toast.error("Could not fetch vendor details.");
      }
    };
    fetchVendor();
  }, [id, token]);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{vendor.name}</h1>
        <p>
          <strong>Owner:</strong> {vendor.admin.email}
        </p>
        <p>
          <strong>Address:</strong> {vendor.address}
        </p>
      </div>
    </div>
  );
}

export default AdminStaffProfilePage;
