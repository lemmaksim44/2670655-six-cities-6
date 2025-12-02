import axios, { AxiosInstance } from 'axios';

const URL = 'https://14.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
  });

  return api;
};
