import connection from "../../databases/postgres.js";

async function userInformation(req, res, next) {
	const email = res.locals.tokenDecoded;

	try {
		const { rows: userRegistred } = await connection.query(
			`SELECT * FROM users WHERE users.email = $1`,
			[email.data]
		);

		if (!userRegistred.length) return res.sendStatus(404);

		const { rows: user } = await connection.query(
			`
            SELECT users.id, users.name, SUM(urls.counter) AS "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId" = users.id
            WHERE users.email = $1
            GROUP BY users.id
        `,
			[email.data]
		);

		const { rows: userUrls } = await connection.query(
			`
            SELECT id, "shortUrl", url, counter AS "visitCount"
            FROM urls
            WHERE "userId" = $1
        `,
			[user[0].id]
		);

		res.locals.user = user[0];
		res.locals.userUrls = userUrls;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default userInformation;
