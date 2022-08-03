import { Router } from "express";

import {
	sendUrlShorten,
	sendUrlById,
	redirectUrl,
	confirmDelete,
	sendLinks,
} from "../controllers/urlController.js";
import urlValidator from "../infra/validators/urlValidator.js";
import verifyToken from "../infra/validators/verifyToken.js";
import urlShorten from "../infra/middlewares/urlShorten.js";
import urlById from "../infra/middlewares/urlById.js";
import searchShortUrl from "../infra/middlewares/searchShortUrl.js";
import isUrlFromUser from "../infra/validators/isUrlFromUser.js";
import deleteUrl from "../infra/middlewares/deleteUrl.js";
import searchUrlsFromUser from "../infra/middlewares/searchUrlsFromUser.js";

const urlRouter = Router();

urlRouter.post(
	"/urls/shorten",
	verifyToken,
	urlValidator,
	urlShorten,
	sendUrlShorten
);

urlRouter.get("/urls", verifyToken, searchUrlsFromUser, sendLinks);

urlRouter.get("/urls/:id", urlById, sendUrlById);

urlRouter.get("/urls/open/:shortUrl", searchShortUrl, redirectUrl);

urlRouter.delete(
	"/urls/:id",
	verifyToken,
	isUrlFromUser,
	deleteUrl,
	confirmDelete
);

export default urlRouter;
