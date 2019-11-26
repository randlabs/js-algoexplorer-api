const { fetchGet } = require("./http/request");
const algosdk = require('algosdk');

async function queryAddress(config, address) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/account/" + address);

	return result.body;
}

async function queryAddressTransactions(config, address, count) {
	if (!algosdk.isValidAddress(address) || typeof (count) !== "number" || count < 1) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/latest/" + count.toString());

	return result.body;
}

module.exports = {
	queryAddress,
	queryAddressTransactions
};
