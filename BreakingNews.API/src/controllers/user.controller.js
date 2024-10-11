import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "submit all fields for registration" });
    }
    const user = await userService.create(req.body);
    if (!user) res.status(400).send({ message: "Erro ao criar o usuário" });
    res.status(201).send({
      message: "User created successfully",
      user: { id: user._id, name, username, email, avatar, background },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();
    if (users.lenght === 0)
      res.status(400).send({ message: "Não existem usuários cadastrados" });
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { user, id } = req;
    const { name, username, email, password, avatar, background } = req.body;
    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: "submit at least one field for update" });
    }
    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );
    res.status(200).send({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };
