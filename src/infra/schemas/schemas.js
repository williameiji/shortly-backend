import joi from "joi";

function schemasValidator(req, data) {
	if (req.method === "POST" && req.url == "/signup") {
		const signupSchema = joi.object({
			name: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required(),
			passwordRef: joi.ref("password"),
		});

		const { error } = signupSchema.validate(data);

		return error;
	}

	if (req.method === "POST" && req.url == "/signin") {
		const signinSchema = joi.object({
			email: joi.string().email().required(),
			password: joi.string().required(),
		});

		const { error } = signinSchema.validate(data);

		return error;
	}

	if (req.method === "POST" && req.url == "/urls/shorten") {
		const urlsSchema = joi.object({
			link: joi
				.string()
				.pattern(
					/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
				)
				.required(),
		});

		const { error } = urlsSchema.validate(data);

		return error;
	}
}

export default schemasValidator;
