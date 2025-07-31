import ENV from "../utils/env.js";
import { GoogleGenAI, Modality } from "@google/genai";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.cloud_name,
  api_key: ENV.api_key,
  api_secret: ENV.api_secret,
});

let genAIInstance = null;
// Gets a singleton instance of the GoogleGenAI client.
const getGoogleGenAIInstance = (apiKey) => {
  if (!apiKey)
    throw new Error(
      "Gemini API Key is required for GoogleGenAI initialization."
    );
  if (!genAIInstance) {
    genAIInstance = new GoogleGenAI({ apiKey });
  }
  return genAIInstance;
};

/**
 * Uploads a base64 encoded image to Cloudinary.
 * @param {string} base64DataUri The base64 data URI of the image.
 * @param {string} [folder='gemini-generated-images'] Optional folder in Cloudinary.
 * @returns {Promise<string>} Secure URL of the uploaded image.
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
 * Generates a single image from a text prompt using Gemini and uploads it to Cloudinary.
 * @param {string} prompt The text description for the image.
 * @param {string} [cloudinaryFolder='gemini-generated-images'] Cloudinary folder for the image.
 * @returns {Promise<string>} The Cloudinary URL of the generated image.
 */
export async function generateSingleImageAndUpload(
  prompt,
  cloudinaryFolder = "gemini-generated-images"
) {
  try {
    const ai = getGoogleGenAIInstance(ENV.geminiAPIKey);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        // CORRECTED: Request both IMAGE and TEXT as required by the model
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Extract the generated image data
    const candidates = response.candidates;
    if (
      !candidates ||
      candidates.length === 0 ||
      !candidates[0].content ||
      !candidates[0].content.parts
    ) {
      throw new Error("No content parts found in Gemini API response.");
    }

    let imageDataUri = null;
    for (const part of candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
        imageDataUri = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break; // Found the image, no need to check further
      }
      // You could optionally log or handle the text part here if needed,
      // but for generating just the image, we'll ignore it after this point.
      // else if (part.text) {
      //   console.log("Model also returned text:", part.text);
      // }
    }

    if (!imageDataUri) {
      throw new Error("No image data found in the Gemini API response.");
    }

    const imageUrl = await uploadBase64ToCloudinary(
      imageDataUri,
      cloudinaryFolder
    );
    return imageUrl;
  } catch (error) {
    console.error("Error in generateSingleImageAndUpload:", error);
    throw new Error(
      `Failed to generate and upload image with Gemini: ${error.message}`
    );
  }
}
