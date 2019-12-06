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
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 1 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from > 100) {
		throw new Error("Max blocks to query is 100");
	}
	const result = await fetchGet(config.url + "/transaction/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryTransactionsByDate(config, since, until, count) {
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
	let url = config.url + "/transaction/since/" + since.toString();
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

module.exports = {
	queryTransactionsCount,
	queryTransactions,
	queryLatestTransactions,
	queryTransactionsFromInterval,
	queryTransactionsByDate
};

