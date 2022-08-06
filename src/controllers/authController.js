import schemasValidator from "../infra/schemas/schemas.js";
import { signupQuery, signinQuery } from "../repository/authRepository.js";
import { userToken } from "../infra/middlewares/userToken.js";

export async function signup(req, res) {
	const data = req.body;

	const errorSchema = schemasValidator(req, data);

	if (errorSchema) return res.status(422).send(errorSchema.details[0].message);

	try {
		const errorDb = await signupQuery(data);

		if (errorDb.severity) return res.status(409).send(errorDb.detail);

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function signin(req, res) {
	const data = req.body;

	const errorSchema = schemasValidator(req, data);

	if (errorSchema) return res.status(422).send(errorSchema.details[0].message);

	try {
		const { rows: userRegistred } = await signinQuery(data);

		const token = userToken(data, userRegistred);

		if (token === "error") return res.sendStatus(401);

		const name = userRegistred[0].name;

		res.status(200).send({ token, name });
	} catch (error) {
		res.sendStatus(500);
	}
}
