import { Router } from "express";

import {
	sendUrlShorten,
	sendUrlById,
	redirectUrl,
} from "../controllers/urlController.js";
import urlValidator from "../infra/validators/urlValidator.js";
import verifyToken from "../infra/validators/verifyToken.js";
import urlShorten from "../infra/middlewares/urlShorten.js";
import urlById from "../infra/middlewares/urlById.js";
import searchShortUrl from "../infra/middlewares/searchShortUrl.js";

const urlRouter = Router();

urlRouter.post(
	"/urls/shorten",
	verifyToken,
	urlValidator,
	urlShorten,
	sendUrlShorten
);

urlRouter.get("/urls/:id", urlById, sendUrlById);

urlRouter.get("/urls/open/:shortUrl", searchShortUrl, redirectUrl);

export default urlRouter;
