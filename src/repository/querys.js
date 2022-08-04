import connection from "../databases/postgres.js";
import bcrypt from "bcrypt";

export async function signup(data) {
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
