import dotenv from "dotenv";

dotenv.config();

const ENV = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  PORT: process.env.PORT || 5000,

  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

  n8nWebhookUrlPing: process.env.N8N_WEBHOOK_URL_PING,
  n8nWebhookUrlRecipeUrl: process.env.N8N_WEBHOOK_URL_RECIPE_URL,

  clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
};

export default ENV;
