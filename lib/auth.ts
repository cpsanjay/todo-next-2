import jwt from "jsonwebtoken";

export const verifyToken = (request) => {
  const token = request.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
