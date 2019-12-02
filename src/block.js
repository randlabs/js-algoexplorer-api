const { fetchGet } = require("./http/request");

async function blockCount(config) {
	const result = await fetchGet(config.url + "/block/count");

	return result.body.blockCount;
}

async function queryBlock(config, round) {
	if ((typeof (round) !== "number" && typeof (round) !== "string") || (typeof (round) === "number" && round < 0)) {
		throw new Error("Invalid argument, round must be a positive integer or a string hash");
	}
	const result = await fetchGet(config.url + "/block/" + round.toString());

	return result.body;
}

async function queryLatestBlock(config, count) {
	let result;
	if (typeof (count) !== "number" || (count < 1) || count > 100) {
		throw new Error("Invalid argument, COUNT must be a positive integer between 1 and 100");
	}
	result = await fetchGet(config.url + "/block/latest/" + count.toString());


	return result.body;
}

async function queryBlockFromInterval(config, from, to) {
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 0 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from + 1 > 100) {
		throw new Error("Max blocks to query is 100");
	}
	const result = await fetchGet(config.url + "/block/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryBlockSince(config, since, until) {
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
		result = await fetchGet(config.url + "/block/since/" + since.toString() + "/until/" + until.toString());
	}
	else {
		result = await fetchGet(config.url + "/block/since/" + since.toString());
	}

	return result.body;
}

async function queryBlockSinceCount(config, since, until) {
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
		result = await fetchGet(config.url + "/block/since/" + since.toString() + "/until/" + until.toString() + "/count");
	}
	else {
		result = await fetchGet(config.url + "/block/since/" + since.toString() + "/count");
	}

	return result.body.blockCount;
}

async function queryBlockTransactions(config, round) {
	if ((typeof (round) !== "number" && typeof (round) !== "string") || (typeof (round) === "number" && round < 0)) {
		throw new Error("Invalid argument, ROUND must be a positive integer");
	}
	const result = await fetchGet(config.url + "/block/" + round.toString() + "/transactions");

	return result.body;
}

module.exports = {
	blockCount,
	queryBlock,
	queryLatestBlock,
	queryBlockFromInterval,
	queryBlockSince,
	queryBlockSinceCount,
	queryBlockTransactions
};
