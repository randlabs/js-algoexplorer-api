const { fetchGet } = require("./http/request");
const algosdk = require('algosdk');


async function queryRelevantAssets(config, address) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/assets/relevant");

	return result.body;
}

module.exports = {
	queryRelevantAssets
};
