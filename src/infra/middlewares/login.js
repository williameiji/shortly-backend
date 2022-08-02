import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function loginToken(req, res, next) {
	const user = res.locals.user;

	if (
		bcrypt.compareSync(user.password) //password
	) {
		const token = jwt.sign(
			{
				data: isUserRegistered.email,
			},
			process.env.SECRET_KEY_TOKEN,
			{ expiresIn: 60 * 60 }
		);

		res.locals.token = token;
		res.locals.name = isUserRegistered.name;

		next();
	} else {
		res.status(401).send("Usuário/senha inválidos.");
		return;
	}
}

export default loginToken;
