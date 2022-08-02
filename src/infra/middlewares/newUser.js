import bcrypt from "bcrypt";

async function newUser(req, res, next) {
	const encryptedPassaword = bcrypt.hashSync(newUser.password, 10);

	next();
}

export default newUser;
