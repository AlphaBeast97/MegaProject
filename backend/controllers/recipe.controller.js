import axios from "axios";
import Recipe from "../models/recipe.model.js";
import ENV from "../utils/env.js";
import { generateSingleImageAndUpload } from "../libs/image_generator.js";

export const getRecipesByUser = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });
    if (!recipes) {
      return res.status(404).json({ error: "No recipes found for this user" });
    }
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const n8n_Recipe = await axios.post(ENV.n8nWebhookUrlRecipeUrl, req.body);
    let imageUrl = null;
    if (n8n_Recipe?.data?.image_prompt) { 
       imageUrl = await generateSingleImageAndUpload(
        n8n_Recipe?.data?.image_prompt
      );
    }
    const Recipe_data = {
      title: n8n_Recipe?.data?.title || "Untitled Recipe",
      ingredients: n8n_Recipe?.data?.ingredients || [],
      instructions: n8n_Recipe?.data?.instructions || [],
      clerkId: n8n_Recipe?.data?.userid || "",
      imageUrl: imageUrl || "",
    };
    console.log("Recipe data to be saved:", Recipe_data);
    const newRecipe = new Recipe({ ...Recipe_data });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
