import connection from "../databases/postgres.js";

export async function searchInformationForRank() {
	return await connection.query(`
            SELECT users.id, users.name, COALESCE(COUNT(urls),0) AS "linksCount", COALESCE(SUM(urls.counter),0) AS "visitCount"
            FROM users
            LEFT JOIN urls
            ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10 
        `);
}
