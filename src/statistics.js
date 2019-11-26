const { fetchGet } = require("./http/request");

async function stats(config) {
	const result = await fetchGet(config.url + "/stats");

	return result.body;
}

async function getGreatestAddressBalanceLastBlock(config) {
	const result = await fetchGet(config.url + "/stats/ranking/balance/latest");

	return result.body;
}

async function getGreatestAddressBalanceInterval(config, since, until) {
	if (typeof (since) !== "number" || typeof (until) !== "number" ||
	since < 0 || until < 0 || (until - since) < 0) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/stats/ranking/balance/since/" + since.toString() + "/until/" + until.toString());

	return result.body;
}

async function getLastStakeAddress(config) {
	const result = await fetchGet(config.url + "/stats/stake");

	return result.body;
}

module.exports = {
	stats,
	getGreatestAddressBalanceLastBlock,
	getGreatestAddressBalanceInterval,
	getLastStakeAddress
};
