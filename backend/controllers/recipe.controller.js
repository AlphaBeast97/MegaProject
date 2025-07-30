import axios from "axios";
import Recipe from "../models/recipe.model.js";
import ENV from "../utils/env.js";

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
    // if (!n8n_Recipe.data.success) {
    //   return res.status(200).json({ error: n8n_Recipe.data.message });
    // }
    // const Recipe_data = {
    //   title: n8n_Recipe.title || "Untitled Recipe",
    //   ingredients: n8n_Recipe.ingredients || [],
    //   instructions: n8n_Recipe.instructions || [],
    //   userId: n8n_Recipe.userId || null,
    // };
    console.log("Recipe data", n8n_Recipe.data);

    // const newRecipe = new Recipe();
    // await newRecipe.save();
    // res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
