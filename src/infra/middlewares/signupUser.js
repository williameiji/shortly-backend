import { signup } from "../../repository/querys.js";

async function signupUser(req, res, next) {
	const data = res.locals.data;

	try {
		const error = await signup(data);

		if (error.severity) return res.status(409).send(error.detail);

		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export default signupUser;
