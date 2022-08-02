import { Router } from "express";

import searchInformationForRank from "../infra/middlewares/searchInformationForRank.js";
import { sendRank } from "../controllers/rankController.js";

const rankRouter = Router();

rankRouter.get("/ranking", searchInformationForRank, sendRank);

export default rankRouter;
