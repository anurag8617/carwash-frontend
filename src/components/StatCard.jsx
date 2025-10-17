import React from "react";

const StatCard = ({ icon, label, value, colorClass }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className={`p-4 rounded-full ${colorClass}`}>
        <IconComponent className="text-3xl text-white" />
      </div>
      <div>
        <h3 className="text-base font-medium text-gray-500">{label}</h3>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
