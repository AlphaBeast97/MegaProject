import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      required: false,
      trim: true,
      default: "Uncategorized",
    },
    clerkId: {
      type: String,
      ref: "User",
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    prepTime: {
      type: String,
      required: false,
      default: "N/A",
    },
    cookTime: {
      type: String,
      required: false,
      default: "N/A",
    },
    imageUrl: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
