import connection from "../../databases/postgres.js";

async function searchInformationForRank(req, res, next) {
	try {
		const { rows: rank } = await connection.query(`
            SELECT users.id, users.name, COALESCE(COUNT(urls),0) AS "linksCount", COALESCE(SUM(urls.counter),0) AS "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId" = users.id
            GROUP BY users.id
        `);

		res.locals.rank = rank;

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default searchInformationForRank;
