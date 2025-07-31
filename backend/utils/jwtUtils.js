import jwt from "jsonwebtoken";

export const extractUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.decode(token);
    return decoded?.sub || null;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
