import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-url.com/api',
  withCredentials: true, // send HTTP-only cookies
});

export default apiClient;