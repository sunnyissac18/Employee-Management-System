import React from "react";

import ListEmployeeComponent from "./ListEmployeeComponent";

import { useAuth } from "../auth/AuthProvider";

const AdminDashboard = () => {
  const { user, getRoles } = useAuth();

  const roles = getRoles().filter((role) => ["HR", "MANAGER"].includes(role));

  return (
    <div className="container-fluid admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-welcome">
              Welcome, {user?.preferred_username}
            </p>

            <h1>Employee Management</h1>

            <p className="dashboard-description">
              Manage employees and employee information.
            </p>
          </div>

          <div className="admin-role">{roles.join(" / ")}</div>
        </div>

        <div className="employee-section">
          <ListEmployeeComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
