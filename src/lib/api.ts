import axios from 'axios';

export const baseURL = 'https://staging.saptakarsa.com/gtw';
export const API = axios.create({
   baseURL,
});

export const axiosAuth = axios.create({
   baseURL,
});

export const axiosAuthServer = axios.create({
   baseURL,
});
