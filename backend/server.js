import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import ENV from "./utils/env.js";
import { connectDB } from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";
import axios from "axios";

// Ensure Clerk secret key is set as environment variable
process.env.CLERK_SECRET_KEY = ENV.clerkSecretKey;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:9002",
      "https://nexium-saad-assign2.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

const PORT = ENV.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
app.get("/api/n8n", async (req, res) => {
  // ping
  try {
    const response = await axios.get(ENV.n8nWebhookUrlPing);
    res.status(200).json(response.data);
    console.log("Pinged n8n successfully:", response.data);
  } catch (error) {
    console.error("Error pinging n8n:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api", userRoutes);
app.use("/api", recipeRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
