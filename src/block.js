const { fetchGet } = require("./http/request");

async function blockCount(config) {
	const result = await fetchGet(config.url + "/block/count");

	return result.body.blockCount;
}

async function queryBlock(config, round) {
	if ((typeof (round) !== "number" && typeof (round) !== "string") || (typeof (round) === "number" && round < 0)) {
		throw new Error("Invalid type");
	}
	const result = await fetchGet(config.url + "/block/" + round.toString());

	return result.body;
}

async function queryLatestBlock(config, count) {
	let result;
	if (typeof (count) !== "number" || (count < 0)) {
		throw new Error("Invalid type");
	}
	result = await fetchGet(config.url + "/block/latest/" + count.toString());


	return result.body;
}

async function queryBlockFromInterval(config, from, to) {
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 0 || to < 0 || from < 1) {
		throw new Error("Invalid type");
	}
	if ((to - from) > 100) {
		throw new Error("Max blocks to query is 100");
	}
	const result = await fetchGet(config.url + "/block/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryBlockSince(config, since, until) {
	if (typeof (since) !== "number" || (until && typeof (until) !== "number") ||
	(until && (until - since) < 0) || since < 0 || (until && until < 1)) {
		throw new Error("Invalid type");
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
	if (typeof (since) !== "number" || (until && typeof (until) !== "number") ||
	(until && (until - since) < 0) || since < 0 || (until && until < 1)) {
		throw new Error("Invalid type");
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
		throw new Error("Invalid type");
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
