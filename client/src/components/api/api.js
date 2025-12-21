
import axios from 'axios';
const api = axios.create({
  baseURL: "https://chatapp-1-376m.onrender.com/api",
  withCredentials: true
});

export default api;