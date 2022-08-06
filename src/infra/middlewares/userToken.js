import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export function userToken(data, userRegistred) {
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

		return token;
	} else {
		return "error";
	}
}
