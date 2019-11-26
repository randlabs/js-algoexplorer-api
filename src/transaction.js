const { fetchGet } = require("./http/request");

async function queryTransactionCount(config) {
	const result = await fetchGet(config.url + "/transaction/count");

	return result.body.txCount;
}

async function queryTransaction(config, id) {
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

async function queryLatestTransaction(config, count) {
	if (typeof (count) !== "number" || count < 1 || count > 100) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/transaction/latest/" + count.toString());

	return result.body;
}

async function queryTransactionFromInterval(config, from, to) {
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 0 || to < 1 || from < 0 || (to - from + 1 > 100)) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/transaction/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

module.exports = {
	queryTransactionCount,
	queryTransaction,
	queryLatestTransaction,
	queryTransactionFromInterval
};

