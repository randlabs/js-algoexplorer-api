const { fetchGet } = require("./http/request");

async function queryBlocksCount(config) {
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

async function queryBlocksByDate(config, options) {
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
	let url = config.url + "/block/since/" + options.since.toString();
	if (options.count) {
		if (options.until) {
			result = await fetchGet(url + "/until/" + options.until.toString() + "/count");
		}
		else {
			result = await fetchGet(url + "/count");
		}
		return result.body.blockCount;
	}
	if (options.until) {
		result = await fetchGet(url + "/until/" + options.until.toString());
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
