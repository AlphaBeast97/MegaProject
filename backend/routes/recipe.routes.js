import express from "express";
import {
  getRecipesByUser,
  createRecipe,
  getRecipeById,
  uploadImage,
} from "../controllers/recipe.controller.js";
const router = express.Router();

router.get("/recipes", getRecipesByUser);
router.post("/recipes", createRecipe);
router.get("/recipes/:id", getRecipeById);
router.post("/upload-image", uploadImage);

export default router;
