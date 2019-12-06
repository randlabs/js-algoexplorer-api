const { fetchGet, fetchPost } = require("./http/request");
const { validateHex } = require("./utils/validates");

async function sendTransaction(config, hexa) {
	if (!validateHex(hexa)) {
		throw new Error("Invalid argument, must be a hex string");
	}
	const body = { hexa: hexa };
	const result = await fetchPost(config.url + "/sendraw", body);

	return result.body.hash;
}

async function queryStatus(config) {
	const result = await fetchGet(config.url + "/status");

	return result.body;
}

module.exports = {
	sendTransaction,
	queryStatus
};
