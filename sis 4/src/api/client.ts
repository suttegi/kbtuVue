import axios, { isAxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
});

export function errorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string }>(error)) {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.code === 'ECONNABORTED') return 'the server took too long to respond';
    if (!error.response) return 'no connection to the server';
    return `request failed with status ${error.response.status}`;
  }
  return 'something went wrong';
}
