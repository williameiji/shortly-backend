import { searchInformationForRank } from "../repository/rankRepository.js";

export async function sendRank(req, res) {
	try {
		const { rows: rank } = await searchInformationForRank();

		res.status(200).send(rank);
	} catch (error) {
		res.sendStatus(500);
	}
}
