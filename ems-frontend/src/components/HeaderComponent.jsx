import React from "react";

import { useAuth } from "../auth/AuthProvider";

const HeaderComponent = () => {
  const { user, logout, getRoles } = useAuth();

  const roles = getRoles().filter((role) =>
    ["HR", "MANAGER", "EMPLOYEE"].includes(role),
  );

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a href="/" className="navbar-brand">
          Employee Management System
        </a>

        <div className="d-flex align-items-center">
          <span className="text-white me-3">{user?.preferred_username}</span>

          <span className="badge bg-primary me-3">{roles.join(" / ")}</span>

          <button className="btn btn-outline-light" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
