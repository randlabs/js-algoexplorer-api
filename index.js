/* eslint-disable func-style */
const { mainnet, testnet, betanet } = require("./src/http/networks");
const { blockCount, queryBlock, queryLatestBlock, queryBlockFromInterval, queryBlockSince,
	queryBlockSinceCount, queryBlockTransactions } = require("./src/block");

// eslint-disable-next-line valid-jsdoc
/**
* @param {string} [networkName] - Network name (mainnet, testnet, betanet)
*/
const AlgoexplorerApi = function(networkName) {
	if (networkName) {
		if (networkName === "mainnet") {
			this._config = mainnet;
		}
		else if (networkName === "testnet") {
			this._config = testnet;
		}
		else if (networkName === "betanet") {
			this._config = betanet;
		}
		else {
			throw new Error("Invalid network name");
		}
	}
	else {
		this._config = mainnet;
	}

	/**
	 * @return {Promise<number>} Returns the amount of available blocks
	 */
	this.blockCount = function () {
		return blockCount(this._config);
	};

	/**
	* @param {(number|string)} round A block number or block hash
	* @return {Promise<object>}  Returns the block information based on the specified round or hash
	*/
	this.queryBlock = function (round) {
		return queryBlock(this._config, round);
	};

	/**
	 * @param {number} Amount Amount of blocks to return between 1 and 100
	 * @return {Promise<Array>} Returns the latest blocks
	 */
	this.queryLatestBlock = function (Amount) {
		return queryLatestBlock(this._config, Amount);
	};

	/**
	 * @param {number} from The starting round number (inclusive)
	 * @param {number} to The ending round number (inclusive)
	 * @return {Promise<Array>} Returns the blocks between the specified rounds
	 */
	this.queryBlockFromInterval = function(from, to) {
		return queryBlockFromInterval(this._config, from, to);
	};

	/**
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @return {Promise<Array>} Returns the latest blocks since the specified timestamp
	 */
	this.queryBlockSince = function(since, until) {
		return queryBlockSince(this._config, since, until);
	};

	/**
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @return {Promise<number>} Returns the amount of blocks between the specified timestamps
	 */
	this.queryBlockSinceCount = function(since, until) {
		return queryBlockSinceCount(this._config, since, until);
	};

	/**
	* @param {(number|string)} round A block number or block hash
	* @return {Promise<Array>}  Returns the transactions of the specified block
	*/
	this.queryBlockTransactions = function(round) {
		return queryBlockTransactions(this._config, round);
	};

};

module.exports = AlgoexplorerApi;
