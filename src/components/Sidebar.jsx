// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// // React icons
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaStore,
//   FaClipboardList,
//   FaUserCog,
//   FaTasks,
//   FaBoxOpen,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Menu, X } from "lucide-react";

// function Sidebar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [isOpen, setIsOpen] = useState(true);

//   // Role-based links with icons
//   const navLinks = {
//     admin: [
//       {
//         path: "/admin/dashboard",
//         name: "Dashboard",
//         icon: <FaTachometerAlt />,
//       },
//       { path: "/admin/vendors", name: "Vendors", icon: <FaStore /> },
//       { path: "/admin/users", name: "Users", icon: <FaUsers /> },
//     ],
//     vendor: [
//       {
//         path: "/vendor/dashboard",
//         name: "Dashboard",
//         icon: <FaTachometerAlt />,
//       },
//       { path: "/vendor/services", name: "Services", icon: <FaClipboardList /> },
//       { path: "/vendor/staff", name: "Staff", icon: <FaUserCog /> },
//       { path: "/vendor/orders", name: "Orders", icon: <FaBoxOpen /> },
//       { path: "/vendor/plans", name: "Plans", icon: <FaTasks /> },
//     ],
//     client: [
//       { path: "/dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
//       { path: "/plans", name: "My Pla", icon: <FaClipboardList /> },
//       { path: "/subscriptions", name: "Subscriptions", icon: <FaBoxOpen /> },
//       { path: "/orders", name: "My Orders", icon: <FaClipboardList /> },
//     ],
//     staff: [
//       {
//         path: "/staff/dashboard",
//         name: "Dashboard",
//         icon: <FaTachometerAlt />,
//       },
//       { path: "/staff/tasks", name: "My Tasks", icon: <FaTasks /> },
//     ],
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://127.0.0.1:8000/api/auth/logout",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.clear();
//       toast.success("Logged out successfully!");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout failed. Logging out anyway.");
//       localStorage.clear();
//       navigate("/login");
//     }
//   };

//   const links = navLinks[user?.role] || [];

//   return (
//     <div
//       className={`${
//         isOpen ? "w-64" : "w-20"
//       } h-screen bg-gray-900 text-white flex flex-col justify-between transition-all duration-300`}
//     >
//       {/* Logo + Toggle */}
//       <div>
//         <div
//           className={`flex items-center p-4 border-b border-gray-700 ${
//             isOpen ? "justify-between" : "justify-center"
//           }`}
//         >
//           {isOpen && (
//             <img
//               src="https://carservices.labhayatech.com/carwash/wp-content/uploads/2025/09/bashbaba.png"
//               alt="Logo"
//               className="w-32"
//             />
//           )}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-white hover:text-[#73C8D2] transition"
//           >
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>

//         {/* Role Title */}
//         {isOpen && (
//           <div className="p-4 text-lg font-semibold capitalize border-b border-gray-700">
//             {user?.role} Panel
//           </div>
//         )}

//         {/* Menu Links */}
//         <nav className="mt-4 space-y-2">
//           {links.map((link) => (
//             <NavLink
//               key={link.name}
//               to={link.path}
//               className={({ isActive }) => {
//                 const baseClasses =
//                   "flex items-center rounded-md transition duration-200 hover:bg-gray-700";
//                 const activeClasses = isActive
//                   ? "bg-gray-700"
//                   : "text-gray-300";
//                 const layoutClasses = isOpen
//                   ? "gap-3 py-2.5 px-4 mx-2"
//                   : "justify-center h-12 w-12 mx-auto";
//                 return `${baseClasses} ${activeClasses} ${layoutClasses}`;
//               }}
//             >
//               <div className="text-lg">{link.icon}</div>
//               {isOpen && (
//                 <span className="text-sm font-medium">{link.name}</span>
//               )}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Logout */}
//       <div className="p-4 border-t border-gray-700">
//         <button
//           onClick={handleLogout}
//           className="flex items-center justify-center gap-3 w-full py-2.5 px-4 rounded-md bg-red-600 hover:bg-red-700 transition duration-200 text-sm font-semibold"
//         >
//           <FaSignOutAlt className="text-lg" />
//           {isOpen && <span>Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// React icons
import {
  FaTachometerAlt,
  FaUsers,
  FaStore,
  FaClipboardList,
  FaUserCog,
  FaTasks,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { Menu, X } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(true);

  // Role-based links with icons
  const navLinks = {
    admin: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: <FaTachometerAlt />,
      },
      { path: "/admin/vendors", name: "Vendors", icon: <FaStore /> },
      { path: "/admin/users", name: "Users", icon: <FaUsers /> },
    ],
    vendor: [
      {
        path: "/vendor/dashboard",
        name: "Dashboard",
        icon: <FaTachometerAlt />,
      },
      { path: "/vendor/services", name: "Services", icon: <FaClipboardList /> },
      { path: "/vendor/staff", name: "Staff", icon: <FaUserCog /> },
      { path: "/vendor/orders", name: "Orders", icon: <FaBoxOpen /> },
      { path: "/vendor/plans", name: "Plans", icon: <FaTasks /> },
    ],
    client: [
      { path: "/dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
      { path: "/plans", name: "My Pla", icon: <FaClipboardList /> },
      { path: "/subscriptions", name: "Subscriptions", icon: <FaBoxOpen /> },
      { path: "/orders", name: "My Orders", icon: <FaClipboardList /> },
    ],
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Logging out anyway.");
      localStorage.clear();
      navigate("/login");
    }
  };

  const links = navLinks[user?.role] || [];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gray-900 text-white flex flex-col justify-between transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div>
        <div
          className={`flex items-center p-4 border-b border-gray-700 ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <img
              src="https://carservices.labhayatech.com/carwash/wp-content/uploads/2025/09/bashbaba.png"
              alt="Logo"
              className="w-32"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[#73C8D2] transition"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Role Title */}
        {isOpen && (
          <div className="p-4 text-lg font-semibold capitalize border-b border-gray-700">
            {user?.role} Panel
          </div>
        )}

        {/* Menu Links */}
        <nav className="mt-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => {
                const baseClasses =
                  "flex items-center rounded-md transition duration-200 hover:bg-gray-700";
                const activeClasses = isActive
                  ? "bg-gray-700"
                  : "text-gray-300";
                const layoutClasses = isOpen
                  ? "gap-3 py-2.5 px-4 mx-2"
                  : "justify-center h-12 w-12 mx-auto";
                return `${baseClasses} ${activeClasses} ${layoutClasses}`;
              }}
            >
              <div className="text-lg">{link.icon}</div>
              {isOpen && (
                <span className="text-sm font-medium">{link.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full py-2.5 px-4 rounded-md bg-red-600 hover:bg-red-700 transition duration-200 text-sm font-semibold"
        >
          <FaSignOutAlt className="text-lg" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
  