export interface User {
  _id: string;
  username: string;
  email: string;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recipe {
  _id: string;
  title: string;
  userId: string;
  ingredients: string[];
  instructions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipeData {
  title: string;
  ingredients: string[];
  instructions: string[];
  userId: string; // Fixed: Changed from 'userid' to 'userId' to match Recipe interface
}