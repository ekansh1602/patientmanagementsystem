import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" });

//User APIS

//Register
export const register = (userData) => API.post(`/users/register`, userData);

//Login
export const login = (userData) => API.post(`/users/login`, userData);

//Patient APIS
//Get patient
export const getPatients = () => API.get(`/patients`);

//Get patient by id
export const getPatient = (id) => API.get(`/patients/${id}`);

//Create patient
export const createPatient = (patientData) => API.post(`/patients`, patientData); 

//Delete patient
export const deletePatient = (id) => API.delete(`/patients/${id}`);