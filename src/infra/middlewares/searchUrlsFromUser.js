import connection from "../../databases/postgres.js";

async function searchUrlsFromUser(req, res, next) {
	const email = res.locals.tokenDecoded;

	try {
		const { rows: links } = await connection.query(
			`
            SELECT urls.id, urls.url, urls."shortUrl", urls.counter 
            FROM urls
            WHERE urls."userId" = (SELECT users.id FROM users WHERE users.email = $1)
        `,
			[email.data]
		);

		res.locals.links = links;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchUrlsFromUser;
