import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listEmployees, deleteEmployee } from "../services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    setLoading(true);
    setError("");

    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Failed to load employees:", error);

        setError("Unable to load employees.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addEmployee = () => {
    navigate("/add-employee");
  };

  const updateEmployee = (id) => {
    navigate(`/update-employee/${id}`);
  };

  const removeEmployee = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }

    deleteEmployee(id)
      .then(() => {
        loadEmployees();
      })
      .catch((error) => {
        console.error("Failed to delete employee:", error);

        alert("Unable to delete employee.");
      });
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    return (
      employee.fullName?.toLowerCase().includes(searchText) ||
      employee.email?.toLowerCase().includes(searchText) ||
      employee.role?.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" />

        <p className="mt-3">Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
        <div>
          <h3>Employees</h3>

          <p>View and manage all employees.</p>
        </div>

        <button className="btn btn-primary" onClick={addEmployee}>
          + Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>

              <th>Employee</th>

              <th>Role</th>

              <th>Email</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>#{employee.id}</td>

                  <td>
                    <strong>{employee.fullName}</strong>
                  </td>

                  <td>
                    <span className="role-badge">{employee.role}</span>
                  </td>

                  <td>{employee.email}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
