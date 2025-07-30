import express from "express";
import {
  getRecipesByUser,
  createRecipe,
  getRecipeById,
} from "../controllers/recipe.controller.js";
const router = express.Router();

router.get("/recipes", getRecipesByUser);
router.post("/recipes", createRecipe);
router.get("/recipes/:id", getRecipeById);

export default router;
