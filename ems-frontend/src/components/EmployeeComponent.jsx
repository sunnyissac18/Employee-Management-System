import React, { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams();

  const [errors, setErros] = useState({
    fullName: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFullName(response.data.fullName);
          setRole(response.data.role);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const navigate = useNavigate();

  function handleFullName(e) {
    setFullName(e.target.value);
  }
  function handleRole(e) {
    setRole(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function saveEmployee(e) {
    e.preventDefault();

    if (validate()) {
      const employee = { fullName, role, email };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        addEmployee(employee)
          .then((response) => {
            
            navigate("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validate() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (fullName.trim()) {
      errorsCopy.fullName = "";
    } else {
      errorsCopy.fullName = "Full name is required";
      valid = false;
    }

    if (role.trim()) {
      errorsCopy.role = "";
    } else {
      errorsCopy.role = "Role is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErros(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-3">Update Employee</h2>;
    } else {
      return <h2 className="text-center mt-3">Add Employee</h2>;
    }
  }

  return (
    <div className="container ">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label ">Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter the Employee Name"
                  name="fullName"
                  value={fullName}
                  className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                  onChange={handleFullName}
                ></input>
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label ">Role:</label>
                <input
                  type="text"
                  placeholder="Enter the Employee Role"
                  name="role"
                  value={role}
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                  onChange={handleRole}
                ></input>
                {errors.role && (
                  <div className="invalid-feedback">{errors.role}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label ">Email:</label>
                <input
                  type="text"
                  placeholder="Enter the Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={handleEmail}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
