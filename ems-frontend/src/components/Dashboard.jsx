import React from "react";

import { useAuth } from "../auth/AuthProvider";

import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard = () => {

    const { isAdmin } = useAuth();

    if (isAdmin()) {
        return <AdminDashboard />;
    }

    return <EmployeeDashboard />;
};

export default Dashboard;