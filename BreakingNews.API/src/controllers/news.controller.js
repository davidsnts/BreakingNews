import {
  createService,
  findAllService,
  findByIdService,
  countNews,
  topNewsService,
  searchByTitleService,
  byUserService,
  updateService,
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
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 5;

    if (!offset) offset = 0;

    const total = await countNews();
    const currentUrl = req.baseUrl;

    const news = await findAllService(limit, offset);
    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;
    const previusUrl =
      previous !== null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    return res.send({
      nextUrl,
      previusUrl,
      limit,
      offset,
      total,
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.username,
        name: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await topNewsService();
    if (!news)
      return res
        .status(400)
        .send({ message: "Não existe uma notícia cadastrada" });

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        userName: news.user.username,
        name: news.user.name,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdService(id);
    if (!news)
      return res
        .status(400)
        .send({ message: "Não existe uma notícia cadastrada" });

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        userName: news.user.username,
        name: news.user.name,
        userAvatar: news.user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const news = await searchByTitleService(title);
    console.log(news);

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.username,
        name: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        userName: item.user.username,
        name: item.user.name,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (err) {}
};

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;
    if (!title && !banner) {
      return res
        .status(400)
        .send({ message: "Preencha os campos corretamente" });
    }
    const news = await findByIdService(id);

    if (news.user.id != req.userId)
      return res
        .status(400)
        .send({ message: "Esse conteúdo não pertence a esse usuário" });

    await updateService(id, title, text, banner);
    return res.send({ message: "Post atualizado com sucesso" });
    
  } catch (err) {}
};
export { create, findAll, topNews, findById, searchByTitle, byUser, update };
