import axios from "axios";
import Recipe from "../models/recipe.model.js";
import ENV from "../utils/env.js";
import { generateSingleImageAndUpload } from "../libs/image_generator.js";
import { getAuth } from "@clerk/express";
import { extractUserIdFromToken } from "../utils/jwtUtils.js";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.cloud_name,
  api_key: ENV.api_key,
  api_secret: ENV.api_secret,
});

// Helper function to get user ID from either Clerk auth or JWT token
const getUserId = (req) => {
  let { userid } = getAuth(req);
  if (!userid) {
    userid = extractUserIdFromToken(req);
  }
  return userid;
};

export const getRecipesByUser = async (req, res) => {
  try {
    const userid = getUserId(req);
    if (!userid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const recipes = await Recipe.find({ clerkId: userid });
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
      description: n8n_Recipe?.data?.description || "",
      category: n8n_Recipe?.data?.category || "Uncategorized",
      ingredients: n8n_Recipe?.data?.ingredients || [],
      instructions: n8n_Recipe?.data?.instructions || [],
      prepTime: n8n_Recipe?.data?.prepTime || "N/A",
      cookTime: n8n_Recipe?.data?.cookTime || "N/A",
      clerkId: n8n_Recipe?.data?.userid || "",
      imageUrl: n8n_Recipe?.data?.imageUrl || imageUrl || "",
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

export const uploadImage = async (req, res) => {
  try {
    const userid = getUserId(req);
    if (!userid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.body.image) {
      return res.status(400).json({ error: "No image data provided" });
    }

    // Upload base64 image to Cloudinary
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: "user-uploaded-images",
      resource_type: "image",
    });

    console.log(`Image uploaded to Cloudinary: ${result.secure_url}`);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
