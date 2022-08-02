export function signup(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export function signin(req, res) {
	try {
		const token = res.locals.token;

		res.status(200).send(token);
	} catch (error) {
		res.sendStatus(500);
	}
}
