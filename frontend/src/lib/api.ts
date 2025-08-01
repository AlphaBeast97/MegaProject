import axios from "axios";
import { User, Recipe, CreateRecipeData } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth interceptor for Clerk tokens
api.interceptors.request.use(async (config) => {
  // For client-side requests, we need to get the token differently
  if (typeof window !== "undefined") {
    try {
      // Access Clerk from window object
      const clerk = (window as any).Clerk;
      if (clerk?.session) {
        const token = await clerk.session.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error getting Clerk token:", error);
    }
  }
  return config;
});

export const userApi = {
  getCurrentUser: () => api.get<User>("/users/me"),
  createUser: (userData: Partial<User>) => api.post<User>("/users", userData),
};

export const recipeApi = {
  getUserRecipes: (userId: string) =>
    api.get<Recipe[]>(`/recipes?userId=${userId}`), // Fixed: Use query parameter
  getRecipe: (id: string) => api.get<Recipe>(`/recipes/${id}`), // This is for recipe ID, not user ID
  createRecipe: (data: CreateRecipeData) => api.post<Recipe>("/recipes", data),
  deleteRecipe: (id: string) => api.delete(`/recipes/${id}`),
};

export const healthApi = {
  checkHealth: () => api.get("/n8n"),
};
