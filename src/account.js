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

async function queryAddressTransactionsFromInterval(config, address, from, to) {
	if (!algosdk.isValidAddress(address) || typeof (from) !== "number" || typeof (to) !== "number" ||
	(to - from) < 0 || to < 1 || from < 0 || (to - from + 1 > 100)) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryAddressTransactionsSince(config, address, since, until) {
	if (!algosdk.isValidAddress(address) || typeof (since) !== "number" || since < 0 || (until && typeof (until) !== "number") ||
	(until && until < 1) || (until && (until < since) < 0)) {
		throw new Error("Invalid type");
	}
	let result;
	let url = config.url + "/account/" + address + "/transactions/since/" + since.toString();
	if (until) {
		result = await fetchGet(url + "/until/" + until.toString());
	}
	else {
		result = await fetchGet(url);
	}

	return result.body;
}

async function queryAddressTransactionsSinceCount(config, address, since, until) {
	if (!algosdk.isValidAddress(address) || typeof (since) !== "number" || since < 0 || (until && typeof (until) !== "number") ||
	(until && until < 1) || (until && (until < since) < 0)) {
		throw new Error("Invalid type");
	}
	let result;
	let url = config.url + "/account/" + address + "/transactions/since/" + since.toString();
	if (until) {
		result = await fetchGet(url + "/until/" + until.toString() + "/count");
	}
	else {
		result = await fetchGet(url + "/count");
	}

	return result.body.txCount;
}

module.exports = {
	queryAddress,
	queryAddressTransactions,
	queryAddressTransactionsFromInterval,
	queryAddressTransactionsSince,
	queryAddressTransactionsSinceCount
};
