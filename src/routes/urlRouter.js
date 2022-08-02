import { Router } from "express";

import { sendUrlShorten } from "../controllers/urlController.js";
import urlValidator from "../infra/validators/urlValidator.js";
import verifyToken from "../infra/validators/verifyToken.js";
import urlShorten from "../infra/middlewares/urlShorten.js";

const urlRouter = Router();

urlRouter.post(
	"/urls/shorten",
	verifyToken,
	urlValidator,
	urlShorten,
	sendUrlShorten
);

export default urlRouter;
