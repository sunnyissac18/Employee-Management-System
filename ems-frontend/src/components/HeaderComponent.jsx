import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <NavLink className="navbar-brand" to="/">
            Employee Management System
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
