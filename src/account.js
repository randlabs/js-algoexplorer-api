const { fetchGet } = require("./http/request");
const algosdk = require("algosdk");

async function queryAccount(config, address) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const result = await fetchGet(config.url + "/account/" + address);

	return result.body;
}

async function queryAccountTransactions(config, address, count) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	if (typeof (count) !== "number" || count < 1) {
		throw new Error("Invalid argument, COUNT must be a positive integer greater than 1");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/latest/" + count.toString());

	return result.body;
}

async function queryAccountTransactionsFromInterval(config, address, from, to) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 1 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from > 100) {
		throw new Error("Max transactions to query is 100");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryAccountTransactionsByDate(config, address, since, until, count) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	if (typeof (since) !== "number" || (until && typeof (until) !== "number")) {
		throw new Error("Invalid arguments, the date must be a positive integer");
	}
	if (since < 1546300800) {
		throw new Error("Invalid date");
	}
	if (until && (until < since)) {
		throw new Error("Invalid arguments, UNTIL must be greater than SINCE");
	}
	if (count && typeof (count) !== "boolean") {
		throw new Error("Invalid arguments, COUNT must be a boolean");
	}
	if (until && (until - since > 172800)) {
		throw new Error("Invalid arguments. Timestamp distance cannot exceed 172800 seconds");
	}
	let result;
	let url = config.url + "/account/" + address + "/transactions/since/" + since.toString();
	if (count) {
		if (until) {
			result = await fetchGet(url + "/until/" + until.toString() + "/count");
		}
		else {
			result = await fetchGet(url + "/count");
		}

		return result.body.txCount;
	}
	if (until) {
		result = await fetchGet(url + "/until/" + until.toString());
	}
	else {
		result = await fetchGet(url);
	}

	return result.body;
}

async function queryAccountAssets(config, address) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/assets/relevant");

	return result.body;
}

async function queryAccountAssetTransactionsFromInterval(config, address, assetID, from, to) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	if (typeof (assetID) !== "number" || assetID < 0) {
		throw new Error("Invalid arguments, assetID must be a positive integer");
	}
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 1 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from > 100) {
		throw new Error("Max transactions to query is 100");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/asset/" + assetID.toString() +
	"/transactions/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

module.exports = {
	queryAccount,
	queryAccountTransactions,
	queryAccountTransactionsFromInterval,
	queryAccountTransactionsByDate,
	queryAccountAssets,
	queryAccountAssetTransactionsFromInterval
};
