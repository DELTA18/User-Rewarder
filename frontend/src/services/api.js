import axios from 'axios';
URI = process.env.BACKEND_URI || 'http://localhost:5000';
const API = axios.create({ baseURL: `${URI}/api` });

export const getUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', { name });
export const claimPoints = (userId, points) => API.post('/claim', { userId, points });
export const getHistory = (userId) => API.get(`/history/${userId}`);
