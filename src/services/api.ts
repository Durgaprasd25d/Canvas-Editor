import axios from 'axios';
import { SearchResponse } from '../types';

const API_KEY = '7u22rjfpoMMEl1DwKTIdoC7Mmo6CJeEIWZXHV8mBlkC9JciakQ0Wi2Od';
const BASE_URL = 'https://api.pexels.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
  },
});

export const searchImages = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await api.get(`/search?query=${encodeURIComponent(query)}&per_page=4`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};