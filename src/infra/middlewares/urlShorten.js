import connection from "../../databases/postgres.js";
import { nanoid } from "nanoid";

async function urlShorten(req, res, next) {
	const data = res.locals.data;
	const email = res.locals.tokenDecoded;

	try {
		const { rows: user } = await connection.query(
			`SELECT * FROM users WHERE users.email = $1`,
			[email.data]
		);

		if (!user.length) return res.sendStatus(401);

		const generateShortUrl = nanoid(8);

		await connection.query(
			`INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3)`,
			[data.url, user[0].id, generateShortUrl]
		);

		res.locals.shortUrl = generateShortUrl;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default urlShorten;
