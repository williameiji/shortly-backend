export function sendUrlShorten(req, res) {
	try {
		const shortUrl = res.locals.shortUrl;

		res.status(201).send({ shortUrl });
	} catch (error) {
		res.sendStatus(500);
	}
}

export function sendUrlById(req, res) {
	try {
		const url = res.locals.url;

		res.status(200).send(url);
	} catch (error) {
		res.sendStatus(500);
	}
}
