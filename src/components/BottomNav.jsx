// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaHome, FaClipboardList, FaBoxOpen, FaUser } from "react-icons/fa";

// const navItems = [
//   { path: "/dashboard", icon: FaHome, label: "Home" },
//   { path: "/orders", icon: FaClipboardList, label: "Orders" },
//   { path: "/subscriptions", icon: FaBoxOpen, label: "Plans" },
//   { path: "/profile", icon: FaUser, label: "Profile" },
// ];

// const BottomNav = () => {
//   const activeLinkStyle = "text-blue-600";
//   const inactiveLinkStyle = "text-gray-500";

//   return (
//     <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center z-50">
//       {navItems.map((item) => (
//         <NavLink
//           key={item.label}
//           to={item.path}
//           // The className prop can accept a function to determine styles based on active state
//           className={({ isActive }) =>
//             `flex flex-col items-center justify-center gap-1 transition-colors ${
//               isActive ? activeLinkStyle : inactiveLinkStyle
//             }`
//           }
//         >
//           <item.icon className="text-2xl" />
//           <span className="text-xs font-medium">{item.label}</span>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default BottomNav;

import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaClipboardList, FaBoxOpen, FaUser } from "react-icons/fa";

const navItems = [
  { path: "/dashboard", icon: FaHome, label: "Home" },
  { path: "/orders", icon: FaClipboardList, label: "Orders" },
  { path: "/subscriptions", icon: FaBoxOpen, label: "Plans" },
  { path: "/profile", icon: FaUser, label: "Profile" },
];

const BottomNav = () => {
  const activeLinkStyle = "text-brand-blue";
  const inactiveLinkStyle = "text-gray-500 dark:text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          // The className prop can accept a function to determine styles based on active state
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

export default BottomNav;
