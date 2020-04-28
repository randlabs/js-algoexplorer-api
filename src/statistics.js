const { fetchGet } = require("./http/request");

async function queryStats(config) {
	const result = await fetchGet(config.url + "/stats");

	return result.body;
}

async function getGreatestAddressBalanceLastBlock(config) {
	const result = await fetchGet(config.url + "/stats/ranking/balance/latest");

	return result.body;
}

async function getGreatestAddressBalanceInterval(config, since, until) {
	const date = (new Date().getTime() / 1000) + 60;
	if (typeof (since) !== "number" || (until && typeof (until) !== "number")) {
		throw new Error("Invalid arguments, must be a positive integers");
	}
	if (since < 1546300800 || since > date) {
		throw new Error("Invalid date");
	}
	if (until && (until < since || until > date)) {
		throw new Error("Invalid arguments, UNTIL must be greater than SINCE");
	}
	const result = await fetchGet(config.url + "/stats/ranking/balance/since/" + since.toString() + "/until/" + until.toString());

	return result.body;
}

async function getLastStakeAddress(config) {
	const result = await fetchGet(config.url + "/stats/stake");

	return result.body;
}

async function queryAlgoStats(config) {
	if (config.id !== "mainnet-v1.0") {
		throw new Error("Invalid query, network must be mainnet");
	}
	const result = await fetchGet(config.url + "/stats/algoprice");

	return result.body;
}

module.exports = {
	queryStats,
	getGreatestAddressBalanceLastBlock,
	getGreatestAddressBalanceInterval,
	getLastStakeAddress,
	queryAlgoStats
};
