const { fetchGet } = require("./http/request");

async function queryTransactionsCount(config) {
	const result = await fetchGet(config.url + "/transaction/count");

	return result.body.txCount;
}

async function queryTransactions(config, id) {
	if ((typeof (id) !== "string" && typeof (id) !== "number") || id < 0) {
		throw new Error("Invalid type");
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
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/transaction/latest/" + count.toString());

	return result.body;
}

async function queryTransactionsFromInterval(config, from, to) {
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 0 || to < 1 || from < 0 || (to - from + 1 > 100)) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/transaction/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryTransactionsSince(config, since, until) {
	if (typeof (since) !== "number" || since < 0 || (until && typeof (until) !== "number") || (until && until < 1) ||
	(until && (until - since) < 0)) {
		throw new Error("Invalid type");
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
	if (typeof (since) !== "number" || since < 0 || (until && typeof (until) !== "number") || (until && until < 1) ||
	(until && (until - since) < 0)) {
		throw new Error("Invalid type");
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

