import { loginService, generateToken } from "../services/auth.service.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService(email);
    if (!user)
      return res.status(404).send({ message: "Usuário ou Senha incorretas" });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      return res.status(404).send({ message: "Usuário ou Senha incorretas" });

    const token = generateToken(user.id);

    res.send({token});
  } catch (err) {
    res.status(500).res.send(err.message);
  }
};

export { login };
