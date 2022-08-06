import schemasValidator from "../infra/schemas/schemas.js";
import { isUserRegistered } from "../repository/userRepository.js";
import {
	urlShorten,
	urlById,
	searchByShortUrl,
	changeCounter,
	isUrlFromUser,
	deleteUrl,
} from "../repository/urlsRepository.js";
import { nanoid } from "nanoid";

export async function sendUrlShorten(req, res) {
	const email = res.locals.tokenDecoded;
	const data = req.body;

	const errorSchema = schemasValidator(req, data);

	if (errorSchema) return res.status(422).send(errorSchema.details[0].message);

	try {
		const { rows: userInformation } = await isUserRegistered(email.data);

		const generateShortUrl = nanoid(6);

		await urlShorten(data.link, userInformation[0].id, generateShortUrl);

		res.status(201).send({ shortUrl: generateShortUrl });
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function sendUrlById(req, res) {
	const { id } = req.params;

	try {
		const { rows: url } = await urlById(id);

		if (!url.length) return res.sendStatus(404);

		res.status(200).send(url[0]);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function redirectUrl(req, res) {
	const { shortUrl } = req.params;

	try {
		const { rows: url } = await searchByShortUrl(shortUrl);

		if (!url.length) return res.sendStatus(404);

		await changeCounter(shortUrl);

		res.status(301).redirect(url[0].url);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function confirmDelete(req, res) {
	const email = res.locals.tokenDecoded;
	const { id } = req.params;

	try {
		const { rows: url } = await urlById(id);

		if (!url.length) return res.sendStatus(404);

		const { rows: urlFromUser } = await isUrlFromUser(email.data, id);

		if (!urlFromUser.length) return res.sendStatus(401);

		await deleteUrl(id);

		res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
	}
}
