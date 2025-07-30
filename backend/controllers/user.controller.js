import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express";

export const getUser = async (req, res) => {
  const { userid } = getAuth(req);
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
  const { userid } = getAuth(req);
  if (!userid) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const existingUser = await User.findOne({ clerkId: userid });
  if (existingUser) {
    return res.status(200).json({ error: "User already exists" });
  }
  const user = await clerkClient.users.getUser(userid);
  const userData = {
    username: user.emailAddresses[0]?.emailAddress.split("@")[0],
    email: user.emailAddresses[0]?.emailAddress,
    clerkId: userid,
  };
  try {
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};