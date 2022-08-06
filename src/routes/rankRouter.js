import { Router } from "express";

import { sendRank } from "../controllers/rankController.js";

const rankRouter = Router();

rankRouter.get("/ranking", sendRank);

export default rankRouter;
