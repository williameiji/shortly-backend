export function signup(req, res) {
	try {
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}
