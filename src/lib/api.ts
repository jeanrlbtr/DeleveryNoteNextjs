import axios from 'axios';

export const baseURL = 'https://dev.saptakarsa.com';
export const API = axios.create({
  baseURL,
});

export const axiosAuth = axios.create({
  baseURL,
});
