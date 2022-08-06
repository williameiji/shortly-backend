import connection from "../databases/postgres.js";
import bcrypt from "bcrypt";

export async function signupQuery(data) {
	const encryptedPassaword = bcrypt.hashSync(data.password, 10);

	try {
		return await connection.query(
			`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
			[data.name, data.email, encryptedPassaword]
		);
	} catch (error) {
		return error;
	}
}

export async function signinQuery(data) {
	try {
		return await connection.query(
			`SELECT * FROM users WHERE users.email = $1`,
			[data.email]
		);
	} catch (error) {
		return error;
	}
}
