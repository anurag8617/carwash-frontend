import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import VendorDashboard from "./pages/vendor/VendorDashboard";
import ServiceListPage from "./pages/vendor/ServiceListPage";
import ServiceFormPage from "./pages/vendor/ServiceFormPage";
import MainLayout from "./components/MainLayout";

import StaffListPage from "./pages/vendor/StaffListPage";
import StaffFormPage from "./pages/vendor/StaffFormPage";

import PlanListPage from "./pages/vendor/PlanListPage";
import PlanFormPage from "./pages/vendor/PlanFormPage";

import PlanBrowsePage from "./pages/client/PlanBrowsePage";
import MySubscriptionsPage from "./pages/client/MySubscriptionsPage";

// A component to protect routes for any logged-in user
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

// A component to protect routes based on a specific role
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // You can redirect to a 'Not Authorized' page or back to their dashboard
    return <Navigate to="/dashboard" />;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Generic Client Dashboard */}
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

          {/* Add routes for other roles (admin, staff) here as needed */}

          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}
export default App;
