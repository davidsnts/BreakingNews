import News from "../models/News.js";

const createService = (body) => News.create(body);
const findAllService = () => News.find();
const findByIdService = (id) => News.findById(id);


export {
  createService,
  findAllService,
  findByIdService 
};
