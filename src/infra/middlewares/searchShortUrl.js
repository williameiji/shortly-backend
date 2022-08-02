import connection from "../../databases/postgres.js";

async function searchShortUrl(req, res, next) {
	const { shortUrl } = req.params;

	try {
		const { rows: url } = await connection.query(
			`SELECT * FROM urls
            WHERE "shortUrl" = $1`,
			[shortUrl]
		);

		if (!url.length) return res.sendStatus(404);

		await connection.query(
			`UPDATE urls 
            SET counter = counter + 1
            WHERE "shortUrl" = $1`,
			[shortUrl]
		);

		res.locals.url = url[0];

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchShortUrl;
