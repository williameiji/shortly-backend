import signupSchema from "../schemas/signupSchema.js";

async function signupValidator(req, res, next) {
	const data = req.body;

	const { error } = signupSchema.validate(data);

	if (error) return res.status(422).send(error.message);

	res.locals.data = data;

	next();
}

export default signupValidator;
