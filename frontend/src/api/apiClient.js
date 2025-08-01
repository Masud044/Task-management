import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // send HTTP-only cookies
});

export default apiClient;