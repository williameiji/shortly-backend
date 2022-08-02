import connection from "../../databases/postgres.js";

async function deleteUrl(req, res, next) {
	const id = res.locals.id;

	try {
		await connection.query(
			`
            DELETE FROM urls
            WHERE id = $1
        `,
			[id]
		);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default deleteUrl;
