export function sendUserInformation(req, res) {
	const user = res.locals.user;
	const userUrls = res.locals.userUrls;

	try {
		const informations = {
			...user,
			shortenedUrls: userUrls,
		};

		res.status(200).send(informations);
	} catch (error) {
		res.sendStatus(500);
	}
}
