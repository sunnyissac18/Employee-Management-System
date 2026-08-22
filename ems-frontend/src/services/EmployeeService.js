import api from "./api";

const REST_API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/employees`;

export const listEmployees = () => api.get(REST_API_BASE_URL);
export const addEmployee = (employee) => api.post(REST_API_BASE_URL, employee);
export const getEmployee = (employeeId) =>api.get(`${REST_API_BASE_URL}/${employeeId}`);
export const updateEmployee = (employeeId, employee) =>api.put(`${REST_API_BASE_URL}/${employeeId}`, employee);
export const deleteEmployee = (employeeId) =>api.delete(`${REST_API_BASE_URL}/${employeeId}`);
export const getCurrentEmployee = () => api.get(`${REST_API_BASE_URL}/me`);
