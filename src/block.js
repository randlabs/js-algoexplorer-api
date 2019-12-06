const { fetchGet } = require("./http/request");

async function queryBlocksCount(config) {
	const result = await fetchGet(config.url + "/block/count");

	return result.body.blockCount;
}

async function queryBlock(config, roundOrId) {
	if ((typeof (roundOrId) !== "number" && typeof (roundOrId) !== "string") || (typeof (roundOrId) === "number" && roundOrId < 0)) {
		throw new Error("Invalid argument, round must be a positive integer or a string hash");
	}
	const result = await fetchGet(config.url + "/block/" + roundOrId.toString());

	return result.body;
}

async function queryLatestBlocks(config, count) {
	let result;
	if (typeof (count) !== "number" || (count < 1) || count > 100) {
		throw new Error("Invalid argument, COUNT must be a positive integer between 1 and 100");
	}
	result = await fetchGet(config.url + "/block/latest/" + count.toString());


	return result.body;
}

async function queryBlocksFromInterval(config, from, to) {
	if (typeof (from) !== "number" || typeof (to) !== "number" || (to - from) < 1 || from < 0 || to < from) {
		throw new Error("Invalid arguments, FROM and TO must be a positive integers, and TO must be greater than FROM");
	}
	if (to - from > 100) {
		throw new Error("Max blocks to query is 100");
	}
	const result = await fetchGet(config.url + "/block/from/" + from.toString() + "/to/" + to.toString());

	return result.body;
}

async function queryBlocksByDate(config, since, until, count) {
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
	let url = config.url + "/block/since/" + since.toString();
	if (count) {
		if (until) {
			result = await fetchGet(url + "/until/" + until.toString() + "/count");
		}
		else {
			result = await fetchGet(url + "/count");
		}
		return result.body.blockCount;
	}
	if (until) {
		result = await fetchGet(url + "/until/" + until.toString());
	}
	else {
		result = await fetchGet(url);
	}

	return result.body;
}

async function queryBlockTransactions(config, round) {
	if ((typeof (round) !== "number" && typeof (round) !== "string") || (typeof (round) === "number" && round < 0)) {
		throw new Error("Invalid argument, round must be a positive integer or a string hash");
	}
	const result = await fetchGet(config.url + "/block/" + round.toString() + "/transactions");

	return result.body;
}

module.exports = {
	queryBlocksCount,
	queryBlock,
	queryLatestBlocks,
	queryBlocksFromInterval,
	queryBlocksByDate,
	queryBlockTransactions
};
