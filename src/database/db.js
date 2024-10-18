import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Conectando ao banco de dados...");
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado ao banco Mongo ATLAS com sucesso!"))
    .catch((error) => console.log("Erro ao conectar no banco: " + error));
};
export default connectDatabase;
