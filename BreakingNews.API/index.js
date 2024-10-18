import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";
import newsRoute from "./src/routes/news.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

connectDatabase();
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
