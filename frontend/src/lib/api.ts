import axios from 'axios';
import { User, Recipe, CreateRecipeData } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// For now, remove auth interceptor since backend doesn't seem to validate tokens
// In a real app, you'd want to use Clerk's getToken() method
// api.interceptors.request.use(async (config) => {
//   // This would be the proper way with Clerk:
//   // const token = await window.Clerk?.session?.getToken();
//   // if (token) {
//     // config.headers.Authorization = `Bearer ${token}`;
//   // }
//   return config;
// });

export const userApi = {
  getCurrentUser: () => api.get<User>('/users/me'),
  createUser: (userData: Partial<User>) => api.post<User>('/users', userData),
};

export const recipeApi = {
  getUserRecipes: (userId: string) => api.get<Recipe[]>(`/recipes?userId=${userId}`), // Fixed: Use query parameter
  getRecipe: (id: string) => api.get<Recipe>(`/recipes/${id}`), // This is for recipe ID, not user ID
  createRecipe: (data: CreateRecipeData) => api.post<Recipe>('/recipes', data),
  deleteRecipe: (id: string) => api.delete(`/recipes/${id}`),
};

export const healthApi = {
  checkHealth: () => api.get('/n8n'),
};