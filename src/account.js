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
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 1 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from > 100) {
		throw new Error("Max transactions to query is 100");
	}
	const result = await fetchGet(config.url + "/account/" + address + "/transactions/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryAddressTransactionsByDate(config, address, options) {
	if (!algosdk.isValidAddress(address)) {
		throw new Error("Invalid address");
	}
	const date = (new Date().getTime() / 1000) + 60;
	if (typeof (options.since) !== "number" || (options.until && typeof (options.until) !== "number")) {
		throw new Error("Invalid arguments, the date must be a positive integer");
	}
	if (options.since < 1546300800 || options.since > date) {
		throw new Error("Invalid date");
	}
	if (options.until && (options.until < options.since || options.until > date)) {
		throw new Error("Invalid arguments, UNTIL must be greater than SINCE");
	}
	if (options.count && typeof (options.count) !== "boolean") {
		throw new Error("Invalid arguments, COUNT must be a boolean");
	}
	let result;
	let url = config.url + "/account/" + address + "/transactions/since/" + options.since.toString();
	if (options.count) {
		if (options.until) {
			result = await fetchGet(url + "/until/" + options.until.toString() + "/count");
		}
		else {
			result = await fetchGet(url + "/count");
		}

		return result.body.txCount;
	}
	if (options.until) {
		result = await fetchGet(url + "/until/" + options.until.toString());
	}
	else {
		result = await fetchGet(url);
	}

	return result.body;
}

module.exports = {
	queryAddress,
	queryAddressTransactions,
	queryAddressTransactionsFromInterval,
	queryAddressTransactionsByDate
};
