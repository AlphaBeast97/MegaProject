import express from "express";
import { getUser, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users/me", getUser);
router.post("/users", createUser);

export default router;
