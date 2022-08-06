import connection from "../databases/postgres.js";
import { nanoid } from "nanoid";

export async function urlShorten(data, id) {
	const generateShortUrl = nanoid(8);

	return await connection.query(
		`INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3)`,
		[data.link, id, generateShortUrl]
	);
}

export async function urlById(id) {
	return await connection.query(
		`SELECT id, "shortUrl", url
        FROM urls
        WHERE urls.id = $1`,
		[id]
	);
}

export async function searchByShortUrl(shortUrl) {
	return await connection.query(
		`SELECT * FROM urls
        WHERE "shortUrl" = $1`,
		[shortUrl]
	);
}

export async function changeCounter(shortUrl) {
	return await connection.query(
		`UPDATE urls 
        SET counter = counter + 1
        WHERE "shortUrl" = $1`,
		[shortUrl]
	);
}

export async function isUrlFromUser(email, id) {
	return await connection.query(
		`
        SELECT url, users.email
        FROM urls
        JOIN users
        ON urls."userId" = users.id
        WHERE users.email = $1 
        AND urls.id = $2
    `,
		[email, id]
	);
}

export async function deleteUrl(id) {
	return await connection.query(
		`
        DELETE FROM urls
        WHERE id = $1
    `,
		[id]
	);
}
