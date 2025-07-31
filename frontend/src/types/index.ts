export interface Recipe {
  _id: string;
  id: string; // For frontend compatibility (can use _id as id)
  title: string;
  description: string; // Add description
  category: string; // Add category  
  clerkId: string; // Based on backend controller
  ingredients: string[]; // Based on backend model
  instructions: string[]; // Based on backend model
  imageUrl: string; // Make required with default
  prepTime: string; // Add prep time
  cookTime: string; // Add cook time
  dataAiHint?: string; // Add AI hint for images
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipeData {
  title: string;
  ingredients: string[];
  instructions: string[];
  userId: string; // This will be sent as userId in the request
}

export interface User {
  _id: string;
  username: string;
  email: string;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}
