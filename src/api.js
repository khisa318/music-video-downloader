import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8888',
});

export const startDownload = async (url, resolution) => {
  const response = await API.post(`/download/${resolution}`, { url });
  return response.data;
};

export const getDownloadProgress = async (videoId) => {
  const response = await API.get(`/progress/${videoId}`);
  return response.data;
};