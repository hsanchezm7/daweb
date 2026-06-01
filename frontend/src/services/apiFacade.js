import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';
const TIMEOUT = 1000;

const defaultConfig = {
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const instance = axios.create(defaultConfig);

export const instancePrivate = axios.create({
  ...defaultConfig,
  withCredentials: true,
});

export const instanceAuth = axios.create({
  ...defaultConfig,
  withCredentials: true,
});
