export function sendRank(req, res) {
	try {
		const rank = res.locals.rank;

		res.status(200).send(rank);
	} catch (error) {
		res.sendStatus(500);
	}
}
