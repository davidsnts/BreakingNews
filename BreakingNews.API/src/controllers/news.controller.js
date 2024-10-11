import {
  createService,
  findAllService,
  findByIdService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner)
      return res
        .status(400)
        .send({ message: "submit all fields for registration" });

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const news = await findAllService();
    return res.send(news);
  } catch (error) {
    return res.status(500).send({ message: err });
  }
};

export { create, findAll };
