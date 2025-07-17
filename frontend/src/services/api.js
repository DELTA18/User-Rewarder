import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', { name });
export const claimPoints = (userId, points) => API.post('/claim', { userId, points });
export const getHistory = (userId) => API.get(`/history/${userId}`);
