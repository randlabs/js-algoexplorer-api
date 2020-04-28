const { fetchGet } = require("./http/request");

async function queryAssetInfo(config, assetID) {
	if (typeof (assetID) !== "number" || assetID < 0) {
		throw new Error("Invalid arguments, assetID must be a positive integer");
	}
	const result = await fetchGet(config.url + "/asset/" + assetID.toString() + "/info");

	return result.body;
}

module.exports = {
	queryAssetInfo
};
