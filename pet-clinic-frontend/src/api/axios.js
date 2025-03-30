import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:5000/api',
});

export default instance;
