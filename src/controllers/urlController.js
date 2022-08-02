export function sendUrlShorten(req, res) {
	try {
		const shortUrl = res.locals.shortUrl;

		res.status(201).send({ shortUrl });
	} catch (error) {
		res.sendStatus(500);
	}
}
