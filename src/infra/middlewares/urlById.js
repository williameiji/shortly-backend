import connection from "../../databases/postgres.js";

async function urlById(req, res, next) {
	const { id } = req.params;
	console.log(req);

	try {
		const { rows: url } = await connection.query(
			`SELECT id, "shortUrl", url
            FROM urls
            WHERE urls.id = $1`,
			[id]
		);

		if (!url.length) return res.sendStatus(404);

		res.locals.url = url[0];

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default urlById;
