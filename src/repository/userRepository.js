import connection from "../databases/postgres.js";

export async function isUserRegistered(email) {
	return await connection.query(`SELECT * FROM users WHERE users.email = $1`, [
		email,
	]);
}

export async function userInformation(email) {
	return await connection.query(
		`
        SELECT users.id, users.name, SUM(urls.counter) AS "visitCount"
        FROM users
        LEFT JOIN urls
        ON urls."userId" = users.id
        WHERE users.email = $1
        GROUP BY users.id
    `,
		[email]
	);
}

export async function urlsInformation(id) {
	return await connection.query(
		`
        SELECT id, "shortUrl", url, counter AS "visitCount"
        FROM urls
        WHERE "userId" = $1
    `,
		[id]
	);
}
