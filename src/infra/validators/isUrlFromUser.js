import connection from "../../databases/postgres.js";

async function isUrlFromUser(req, res, next) {
	const email = res.locals.tokenDecoded;
	const { id } = req.params;

	try {
		const { rows: url } = await connection.query(
			`
            SELECT * FROM urls
            WHERE id = $1
        `,
			[id]
		);

		if (!url.length) return res.sendStatus(404);

		const { rows: urlFromUser } = await connection.query(
			`
            SELECT url, users.email
            FROM urls
            JOIN users
            ON urls."userId" = users.id
            WHERE users.email = $1 
            AND urls.id = $2
        `,
			[email.data, id]
		);

		if (!urlFromUser.length) return res.sendStatus(401);

		res.locals.id = id;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default isUrlFromUser;
