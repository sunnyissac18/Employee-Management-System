import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

import Dashboard from "./components/Dashboard";
import EmployeeComponent from "./components/EmployeeComponent";

import { useAuth } from "./auth/AuthProvider";

function App() {
  const { isAdmin } = useAuth();

  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/employees"
          element={isAdmin() ? <Dashboard /> : <Dashboard />}
        />

        <Route
          path="/add-employee"
          element={isAdmin() ? <EmployeeComponent /> : <Dashboard />}
        />

        <Route
          path="/update-employee/:id"
          element={isAdmin() ? <EmployeeComponent /> : <Dashboard />}
        />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
