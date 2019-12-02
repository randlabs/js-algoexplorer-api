const { fetchGet } = require("./http/request");
const algosdk = require('algosdk');

async function queryAddress(config, address) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const result = await fetchGet(config.url + "/account/" + address);

	return result.body;
}

async function queryAddressTransactions(config, address, count) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	if (typeof (count) !== "number" || count < 1) {
		throw new Error("Invalid argument, COUNT must be a positive integer greater than 1");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/latest/" + count.toString());

	return result.body;
}

async function queryAddressTransactionsFromInterval(config, address, from, to) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 0 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from + 1 > 100) {
		throw new Error("Max transactions to query is 100");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryAddressTransactionsSince(config, address, since, until) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const date = (new Date().getTime() / 1000) + 1200;
	if (typeof (since) !== "number" || (until && typeof (until) !== "number")) {
		throw new Error("Invalid arguments, must be a positive integers");
	}
	if (since < 1546300800 || since > date) {
		throw new Error("Invalid date");
	}
	if (until && until < since) {
		throw new Error("Invalid arguments, UNTIL must be greater than SINCE");
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
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const date = (new Date().getTime() / 1000) + 1200;
	if (typeof (since) !== "number" || (until && typeof (until) !== "number")) {
		throw new Error("Invalid arguments, must be a positive integers");
	}
	if (since < 1546300800 || since > date) {
		throw new Error("Invalid date");
	}
	if (until && until < since) {
		throw new Error("Invalid arguments, UNTIL must be greater than SINCE");
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
