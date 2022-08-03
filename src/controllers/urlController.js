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

export function redirectUrl(req, res) {
	try {
		const url = res.locals.url;

		res.status(301).redirect(url.url);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function confirmDelete(req, res) {
	try {
		res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function sendLinks(req, res) {
	try {
		const links = res.locals.links;

		res.status(200).send(links);
	} catch (error) {
		res.sendStatus(500);
	}
}
