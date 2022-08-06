import {
	isUserRegistered,
	userInformation,
	urlsInformation,
} from "../repository/userRepository.js";

export async function sendUserInformation(req, res) {
	const email = res.locals.tokenDecoded;

	try {
		const { rows: userRegistred } = await isUserRegistered(email.data);

		if (!userRegistred.length) return res.sendStatus(404);

		const { rows: user } = await userInformation(email.data);

		const { rows: userUrls } = await urlsInformation(user[0].id);

		const informations = {
			...user,
			shortenedUrls: userUrls,
		};

		res.status(200).send(informations);
	} catch (error) {
		res.sendStatus(500);
	}
}
