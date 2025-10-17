import React from "react";
import StaffBottomNav from "./StaffBottomNav";
import ClientHeader from "../../components/ClientHeader";

function StaffTasksPage() {
  return (
    <div className="pb-24">
      <ClientHeader title="My Tasks" />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No tasks assigned yet.
        </h2>
        <p className="text-gray-500">Please check back later.</p>
      </div>
      <StaffBottomNav />
    </div>
  );
}

export default StaffTasksPage;
