import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express";
import { extractUserIdFromToken } from "../utils/jwtUtils.js";

// Helper function to get user ID from either Clerk auth or JWT token
const getUserId = (req) => {
  let { userid } = getAuth(req);
  if (!userid) {
    userid = extractUserIdFromToken(req);
  }
  return userid;
};

export const getUser = async (req, res) => {
  const userid = getUserId(req);
  if (!userid) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ clerkId: userid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const userid = getUserId(req);
  if (!userid) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: userid });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Get user details from Clerk
    const clerkUser = await clerkClient.users.getUser(userid);

    // Create new user
    const userData = {
      username:
        clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "user",
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      clerkId: userid,
    };

    const newUser = new User(userData);
    await newUser.save();

    console.log("User created successfully:", newUser._id);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
