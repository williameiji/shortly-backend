import urlsSchema from "../schemas/urlsSchema.js";

function urlValidator(req, res, next) {
	const data = req.body;

	const { error } = urlsSchema.validate(data);

	if (error) return res.status(422).send(error.message);

	res.locals.data = data;

	next();
}

export default urlValidator;
