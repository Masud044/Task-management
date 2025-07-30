import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = (token) => axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (data, token) => axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id, data, token) => axios.put(`${API_URL}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTask = (id, token) => axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
