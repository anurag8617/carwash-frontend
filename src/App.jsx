// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Import your pages and components
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import MainLayout from "./components/MainLayout";
// import VendorDashboard from "./pages/vendor/VendorDashboard";
// import ServiceListPage from "./pages/vendor/ServiceListPage";
// import ServiceFormPage from "./pages/vendor/ServiceFormPage";
// import StaffListPage from "./pages/vendor/StaffListPage";
// import StaffFormPage from "./pages/vendor/StaffFormPage";
// import PlanListPage from "./pages/vendor/PlanListPage";
// import PlanFormPage from "./pages/vendor/PlanFormPage";
// import PlanBrowsePage from "./pages/client/PlanBrowsePage";
// import MySubscriptionsPage from "./pages/client/MySubscriptionsPage";
// import MyOrdersPage from "./pages/client/MyOrdersPage";
// import PaymentPage from "./pages/client/PaymentPage";
// import AdminVendorListPage from "./pages/admin/AdminVendorListPage";
// import ProfilePage from "./pages/client/ProfilePage";

// // NEW: A simple layout for the client-side interface without a sidebar.
// const ClientLayout = ({ children }) => {
//   return <main className="min-h-screen bg-gray-50">{children}</main>;
// };

// // MODIFIED: This route guard is now smarter.
// // It shows the sidebar layout for admins/vendors and a clean layout for clients.
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // If the user is a client, use the simple ClientLayout.
//   if (user?.role === "client") {
//     return <ClientLayout>{children}</ClientLayout>;
//   }

//   // For any other role (admin, vendor, etc.), use the MainLayout with the sidebar.
//   return <MainLayout>{children}</MainLayout>;
// };

// // RoleBasedRoute remains the same, as it's correctly used for specific roles.
// const RoleBasedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(user?.role)) {
//     return <Navigate to="/dashboard" />;
//   }

//   return <MainLayout>{children}</MainLayout>;
// };

// function App() {
//   return (
//     <Router>
//       {/* The outer div is no longer needed as layouts handle the background */}
//       <>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* === Client & Admin Shared/Specific Routes === */}
//           {/* The updated PrivateRoute will correctly handle the layout for /dashboard */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/plans"
//             element={
//               <PrivateRoute>
//                 <PlanBrowsePage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/subscriptions"
//             element={
//               <PrivateRoute>
//                 <MySubscriptionsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/orders"
//             element={
//               <PrivateRoute>
//                 <MyOrdersPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/pay/:orderId"
//             element={
//               <PrivateRoute>
//                 <PaymentPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <PrivateRoute>
//                 <ProfilePage />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/help"
//             element={
//               <PrivateRoute>
//                 <div>Help Page Coming Soon!</div>
//               </PrivateRoute>
//             }
//           />

//           {/* Admin Routes */}
//           <Route
//             path="/admin/vendors"
//             element={
//               <RoleBasedRoute allowedRoles={["admin"]}>
//                 <AdminVendorListPage />
//               </RoleBasedRoute>
//             }
//           />

//           {/* Vendor Routes */}
//           <Route
//             path="/vendor/dashboard"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <VendorDashboard />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/services"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <ServiceListPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/services/new"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <ServiceFormPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/services/edit/:id"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <ServiceFormPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/staff"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <StaffListPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/staff/new"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <StaffFormPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/plans"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <PlanListPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/plans/new"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <PlanFormPage />
//               </RoleBasedRoute>
//             }
//           />
//           <Route
//             path="/vendor/plans/edit/:id"
//             element={
//               <RoleBasedRoute allowedRoles={["vendor"]}>
//                 <PlanFormPage />
//               </RoleBasedRoute>
//             }
//           />

//           {/* Default route */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//         <ToastContainer position="bottom-right" autoClose={3000} />
//       </>
//     </Router>
//   );
// }
// export default App;

import React from "react"; // No longer need useState and useEffect here
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your pages and components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import ServiceListPage from "./pages/vendor/ServiceListPage";
import ServiceFormPage from "./pages/vendor/ServiceFormPage";
import StaffListPage from "./pages/vendor/StaffListPage";
import StaffFormPage from "./pages/vendor/StaffFormPage";
import PlanListPage from "./pages/vendor/PlanListPage";
import PlanFormPage from "./pages/vendor/PlanFormPage";
import PlanBrowsePage from "./pages/client/PlanBrowsePage";
import MySubscriptionsPage from "./pages/client/MySubscriptionsPage";
import MyOrdersPage from "./pages/client/MyOrdersPage";
import PaymentPage from "./pages/client/PaymentPage";
import AdminVendorListPage from "./pages/admin/AdminVendorListPage";
import ProfilePage from "./pages/client/ProfilePage";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffTasksPage from "./pages/staff/StaffTasksPage";
import StaffProfilePage from "./pages/staff/StaffProfilePage";

// NEW: A simple layout for the client-side interface without a sidebar.
const ClientLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-brand-beige dark:bg-gray-900">
      {children}
    </main>
  );
};

const StaffLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-brand-beige dark:bg-gray-900">
      {children}
    </main>
  );
};

// MODIFIED: This route guard is now smarter.
// It shows the sidebar layout for admins/vendors and a clean layout for clients.
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user is a client, use the simple ClientLayout.
  if (user?.role === "client") {
    return <ClientLayout>{children}</ClientLayout>;
  }

  if (user?.role === "staff") {
    return <StaffLayout>{children}</StaffLayout>;
  }

  // For any other role (admin, vendor, etc.), use the MainLayout with the sidebar.
  return <MainLayout>{children}</MainLayout>;
};

// RoleBasedRoute remains the same, as it's correctly used for specific roles.
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  // All theme logic has been removed from here

  return (
    <Router>
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* === Client & Admin Shared/Specific Routes === */}
          {/* The updated PrivateRoute will correctly handle the layout for /dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/plans"
            element={
              <PrivateRoute>
                <PlanBrowsePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <PrivateRoute>
                <MySubscriptionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <MyOrdersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pay/:orderId"
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/help"
            element={
              <PrivateRoute>
                <div>Help Page Coming Soon!</div>
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/vendors"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminVendorListPage />
              </RoleBasedRoute>
            }
          />

          {/* Vendor Routes */}
          <Route
            path="/vendor/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <VendorDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/services"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <ServiceListPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/services/new"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <ServiceFormPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/services/edit/:id"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <ServiceFormPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/staff"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <StaffListPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/staff/new"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <StaffFormPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/plans"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <PlanListPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/plans/new"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <PlanFormPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/vendor/plans/edit/:id"
            element={
              <RoleBasedRoute allowedRoles={["vendor"]}>
                <PlanFormPage />
              </RoleBasedRoute>
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff/dashboard"
            element={
              <PrivateRoute>
                <StaffDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/staff/tasks"
            element={
              <PrivateRoute>
                <StaffTasksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/staff/profile"
            element={
              <PrivateRoute>
                <StaffProfilePage />
              </PrivateRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </>
    </Router>
  );
}
export default App;
