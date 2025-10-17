import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";

const navItems = [
  { path: "/staff/dashboard", icon: FaHome, label: "Home" },
  { path: "/staff/tasks", icon: FaTasks, label: "Tasks" },
  { path: "/staff/profile", icon: FaUser, label: "Profile" },
];

const StaffBottomNav = () => {
  const activeLinkStyle = "text-brand-blue";
  const inactiveLinkStyle = "text-gray-500 dark:text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? activeLinkStyle : inactiveLinkStyle
            }`
          }
        >
          <item.icon className="text-2xl" />
          <span className="text-xs font-medium">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default StaffBottomNav;
