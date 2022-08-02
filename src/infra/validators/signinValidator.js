import signinSchema from "../schemas/signinSchema.js";

async function signinValidator(req, res, next) {
	const data = req.body;

	const { error } = signinSchema.validate(data);

	if (error) return res.status(422).send(error.message);

	res.locals.data = data;

	next();
}

export default signinValidator;
