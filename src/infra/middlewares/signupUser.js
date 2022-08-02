import connection from "../../databases/postgres.js";
import bcrypt from "bcrypt";

async function signupUser(req, res, next) {
	const data = res.locals.data;

	const encryptedPassaword = bcrypt.hashSync(data.password, 10);

	try {
		await connection.query(
			`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
			[data.name, data.email, encryptedPassaword]
		);

		next();
	} catch (error) {
		res.sendStatus(409);
	}
}

export default signupUser;
