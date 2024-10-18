import { Router } from "express"
import userControler from "../controllers/user.controller.js";
import {validId, validUser}  from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", userControler.create);
router.get("/", userControler.findAll);
router.get("/:id", validId, validUser, userControler.findById);
router.patch("/:id", validId, validUser, userControler.update);
export default router;