import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer "))
      return res.status(401).json({ message: "Token missing or malformed" });

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    const user = await userService.findByIdService(decoded.id);

    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado" });

    req.user = user;
    req.userId = user._id;

    console.log(user);

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")
      return res.status(401).json({ message: "Invalid or expired token" });

    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
