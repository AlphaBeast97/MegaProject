// src/geminiImageGenerator.js (Corrected imports for @google/generative-ai)

import ENV from "../utils/env.js"; // Adjust the import path as necessary
import { GoogleGenerativeAI } from "@google/generative-ai"; // Removed Modality from import
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

let genAIInstance = null;
const getGenerativeModel = (apiKey) => {
  if (!apiKey) {
    throw new Error("Gemini API Key is required for model initialization.");
  }
  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance.getGenerativeModel({
    model: "gemini-2.0-flash-preview-image-generation",
    generationConfig: {
      // Use string literals 'TEXT' and 'IMAGE' directly
      responseModalities: ["TEXT", "IMAGE"],
    },
  });
};

/**
 * Extracts the first image data URI from a Gemini API response.
 * @param {Array} parts An array of content parts from a Gemini response.
 * @returns {string | null} The base64 data URI of the image, or null if not found.
 */
const extractImageDataUri = (parts) => {
  for (const part of parts) {
    if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  return null;
};

/**
 * Uploads a base64 encoded image to Cloudinary.
 * @param {string} base64DataUri The base64 data URI of the image (e.g., "data:image/png;base64,...").
 * @param {string} [folder='gemini-generated-images'] Optional folder in Cloudinary to upload to.
 * @returns {Promise<string>} A promise that resolves with the secure URL of the uploaded image.
 * @throws {Error} If the upload to Cloudinary fails.
 */
const uploadBase64ToCloudinary = async (
  base64DataUri,
  folder = "gemini-generated-images"
) => {
  try {
    const result = await cloudinary.uploader.upload(base64DataUri, {
      folder: folder,
    });
    console.log(`Uploaded to Cloudinary: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
};

/**
 * Reads a local image file and converts it to a base64 data URI for input to Gemini.
 * @param {string} filePath The path to the local image file.
 * @returns {Promise<{ mimeType: string, data: string }>} An object containing the MIME type and base64 data.
 * @throws {Error} If the file cannot be read.
 */
const readFileAsBase64 = async (filePath) => {
  try {
    const imageData = await fs.readFile(filePath);
    const mimeType = `image/${path.extname(filePath).substring(1)}`;
    return { mimeType, data: imageData.toString("base64") };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw new Error(
      `Failed to read image file for Gemini input: ${error.message}`
    );
  }
};

/**
 * Generates an image based on a text prompt using Gemini and uploads it to Cloudinary.
 * @param {string} prompt The text description for the image.
 * @param {string} [cloudinaryFolder='gemini-generated-images'] The folder in Cloudinary to save the image.
 * @returns {Promise<string>} A promise that resolves with the Cloudinary URL of the generated image.
 * @throws {Error} If image generation or upload fails.
 */
export async function generateImageWithGeminiAndUpload(
  prompt,
  cloudinaryFolder = "gemini-generated-images"
) {
  try {
    const model = getGenerativeModel(ENV.GEMINI_API_KEY);
    const contents = [{ text: prompt }];

    const result = await model.generateContent({ contents: contents });
    const response = await result.response;
    const imageDataUri = extractImageDataUri(
      response.candidates[0].content.parts
    );

    if (!imageDataUri) {
      console.warn(
        "Gemini did not return an image; possibly returned text only."
      );
      throw new Error("No image data found in the Gemini API response.");
    }

    return await uploadBase64ToCloudinary(imageDataUri, cloudinaryFolder);
  } catch (error) {
    console.error("Error in generateImageWithGeminiAndUpload:", error);
    throw new Error(
      `Failed to generate and upload image with Gemini: ${error.message}`
    );
  }
}

/**
 * Generates and/or edits an image using both text and an existing image (from local path)
 * with Gemini, then uploads it to Cloudinary.
 * @param {string} prompt The text instruction for the image generation/editing.
 * @param {string} inputImagePath The path to the existing image file.
 * @param {string} [cloudinaryFolder='gemini-edited-images'] The folder in Cloudinary to save the edited image.
 * @returns {Promise<string>} A promise that resolves with the Cloudinary URL of the edited image.
 * @throws {Error} If image generation/editing or upload fails.
 */
export async function generateImageWithInputGeminiAndUpload(
  prompt,
  inputImagePath,
  cloudinaryFolder = "gemini-edited-images"
) {
  try {
    const model = getGenerativeModel(ENV.geminiAPIKey);
    const { mimeType, data: base64InputData } = await readFileAsBase64(
      inputImagePath
    );

    const contents = [
      { text: prompt },
      { inlineData: { mimeType: mimeType, data: base64InputData } },
    ];

    const result = await model.generateContent({ contents: contents });
    const response = await result.response;
    const imageDataUri = extractImageDataUri(
      response.candidates[0].content.parts
    );

    if (!imageDataUri) {
      console.warn(
        "Gemini did not return an image for editing; possibly returned text only."
      );
      throw new Error(
        "No image data found in the Gemini API response for editing."
      );
    }

    return await uploadBase64ToCloudinary(imageDataUri, cloudinaryFolder);
  } catch (error) {
    console.error("Error in generateImageWithInputGeminiAndUpload:", error);
    throw new Error(
      `Failed to generate/edit and upload image with Gemini: ${error.message}`
    );
  }
}
