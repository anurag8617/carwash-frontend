import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminVendorListPage() {
  const [vendors, setVendors] = useState([]);
  const token = localStorage.getItem("token");

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
  }, [token]);

  // --- Add this new handleDelete function ---
  const handleDelete = async (vendorId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this vendor? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/vendors/${vendorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Remove the vendor from the local state to update the UI instantly
        setVendors(vendors.filter((vendor) => vendor.id !== vendorId));
        toast.success("Vendor deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete vendor.");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Vendors</h1>
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Business Name</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Address</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b">
                <td className="p-4">{vendor.name}</td>
                <td className="p-4">
                  {vendor.admin ? vendor.admin.email : "N/A"}
                </td>
                <td className="p-4">{vendor.address}</td>
                <td className="p-4">
                  {/* --- Add the Delete button --- */}
                  <button
                    onClick={() => handleDelete(vendor.id)}
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

export default AdminVendorListPage;
