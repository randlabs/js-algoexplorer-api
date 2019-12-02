const { fetchGet } = require("./http/request");

async function queryTransactionsCount(config) {
	const result = await fetchGet(config.url + "/transaction/count");

	return result.body.txCount;
}

async function queryTransactions(config, id) {
	if ((typeof (id) !== "string" && typeof (id) !== "number") || id < 0) {
		throw new Error("Invalid argument, transaction id must be a positive integer or a string hash");
	}
	let result;
	if (typeof (id) === "number") {
		result = await fetchGet(config.url + "/transaction/" + id.toString());
	}
	else {
		result = await fetchGet(config.url + "/transaction/" + id);
	}

	return result.body;
}

async function queryLatestTransactions(config, count) {
	if (typeof (count) !== "number" || count < 1 || count > 100) {
		throw new Error("Invalid argument, COUNT must be a positive integer between 1 and 100");
	}
	const result = await fetchGet(config.url + "/transaction/latest/" + count.toString());

	return result.body;
}

async function queryTransactionsFromInterval(config, from, to) {
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 0 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from + 1 > 100) {
		throw new Error("Max blocks to query is 100");
	}
	const result = await fetchGet(config.url + "/transaction/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryTransactionsSince(config, since, until) {
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
	let result;
	if (until) {
		result = await fetchGet(config.url + "/transaction/since/" + since.toString() + "/until/" + until.toString());
	}
	else {
		result = await fetchGet(config.url + "/transaction/since/" + since.toString());
	}

	return result.body;
}

async function queryTransactionsSinceCount(config, since, until) {
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
	let result;
	if (until) {
		result = await fetchGet(config.url + "/transaction/since/" + since.toString() + "/until/" + until.toString() + "/count");
	}
	else {
		result = await fetchGet(config.url + "/transaction/since/" + since.toString() + "/count");
	}

	return result.body.txCount;
}

module.exports = {
	queryTransactionsCount,
	queryTransactions,
	queryLatestTransactions,
	queryTransactionsFromInterval,
	queryTransactionsSince,
	queryTransactionsSinceCount
};

