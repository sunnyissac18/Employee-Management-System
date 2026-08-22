import React, { useEffect, useState } from "react";

import {
    getCurrentEmployee
} from "../services/EmployeeService";

import { useAuth } from "../auth/AuthProvider";

const EmployeeDashboard = () => {

    const { user } = useAuth();

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        getCurrentEmployee()

            .then((response) => {

                setEmployee(response.data);

            })

            .catch((error) => {

                console.error(
                    "Failed to load employee profile:",
                    error
                );

                setError(
                    "Unable to load your employee information."
                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);


    if (loading) {

        return (
            <div className="container text-center py-5">

                <div
                    className="spinner-border"
                    role="status"
                />

                <p className="mt-3">
                    Loading your dashboard...
                </p>

            </div>
        );
    }


    if (error) {

        return (
            <div className="container py-5">

                <div className="alert alert-danger">
                    {error}
                </div>

            </div>
        );
    }


    return (
        <div className="container employee-dashboard">

            <div className="employee-welcome">

                <p>
                    Welcome back
                </p>

                <h1>
                    {employee?.fullName ||
                        user?.preferred_username}
                </h1>

                <span>
                    Employee Dashboard
                </span>

            </div>


            <div className="row g-4 mt-2">

                <div className="col-md-6">

                    <div className="profile-card">

                        <h4>
                            Personal Information
                        </h4>

                        <hr />

                        <div className="profile-item">

                            <span>
                                Employee ID
                            </span>

                            <strong>
                                #{employee?.id}
                            </strong>

                        </div>


                        <div className="profile-item">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {employee?.fullName}
                            </strong>

                        </div>


                        <div className="profile-item">

                            <span>
                                Email
                            </span>

                            <strong>
                                {employee?.email}
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="col-md-6">

                    <div className="profile-card">

                        <h4>
                            Employment Information
                        </h4>

                        <hr />

                        <div className="profile-item">

                            <span>
                                Position
                            </span>

                            <strong>
                                {employee?.role}
                            </strong>

                        </div>


                        <div className="profile-item">

                            <span>
                                Account
                            </span>

                            <span className="status-badge">
                                Active
                            </span>

                        </div>


                        <div className="profile-item">

                            <span>
                                Access
                            </span>

                            <strong>
                                Employee
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default EmployeeDashboard;