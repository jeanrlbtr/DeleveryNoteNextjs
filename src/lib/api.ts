import axios from 'axios';

export const baseURL = 'https://dev.saptakarsa.com/gtw';
export const API = axios.create({
  baseURL,
});

export const axiosAuth = axios.create({
  baseURL,
});
