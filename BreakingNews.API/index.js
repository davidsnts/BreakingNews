const express = require("express");
const app = express();
app.use(express.json());
const userRoute = require("./src/routes/user.route");
const PORT = 3000;
app.use("/user", userRoute);
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
