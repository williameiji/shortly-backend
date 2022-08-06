import { Router } from "express";

import {
	sendUrlShorten,
	sendUrlById,
	redirectUrl,
	confirmDelete,
} from "../controllers/urlController.js";
import verifyToken from "../infra/validators/verifyToken.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", verifyToken, sendUrlShorten);

urlRouter.get("/urls/:id", sendUrlById);

urlRouter.get("/urls/open/:shortUrl", redirectUrl);

urlRouter.delete("/urls/:id", verifyToken, confirmDelete);

export default urlRouter;
