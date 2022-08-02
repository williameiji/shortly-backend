import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connection from "../../databases/postgres.js";

dotenv.config();

async function loginToken(req, res, next) {
	const data = res.locals.data;

	try {
		const { rows: userRegistred } = await connection.query(
			`SELECT * FROM users WHERE users.email = $1`,
			[data.email]
		);

		if (
			userRegistred.length &&
			bcrypt.compareSync(data.password, userRegistred[0].password)
		) {
			const token = jwt.sign(
				{
					data: userRegistred[0].email,
				},
				process.env.SECRET_KEY_TOKEN
			);

			res.locals.token = token;

			next();
		} else {
			res.status(401).send("Usuário/senha inválidos.");
			return;
		}
	} catch (error) {
		res.sendStatus(500);
	}
}

export default loginToken;
