/* eslint-disable func-style */
const { mainnet, testnet, betanet } = require("./src/http/networks");
const { blockCount, queryBlock, queryLatestBlock, queryBlockFromInterval, queryBlockSince,
	queryBlockSinceCount, queryBlockTransactions } = require("./src/block");
const { stats, getGreatestAddressBalanceLastBlock, getGreatestAddressBalanceInterval,
	getLastStakeAddress } = require("./src/statistics");
const { queryAddress, queryAddressTransactions, queryAddressTransactionsFromInterval,
	queryAddressTransactionsSince, queryAddressTransactionsSinceCount } = require("./src/account");
const { queryTransactionsCount, queryTransactions, queryLatestTransactions, queryTransactionsFromInterval,
	queryTransactionsSince, queryTransactionsSinceCount } = require("./src/transaction");
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

	/**
	 * @return {Promise<object>} Returns statistics about the blockchain
	 */
	this.stats = function() {
		return stats(this._config);
	};

	/**
	 * @return {Promise<object>} Returns addresses with greatest balance in the last block
	 */
	this.getGreatestAddressBalanceLastBlock = function() {
		return getGreatestAddressBalanceLastBlock(this._config);
	};

	/**
	 * @param {number} since Timestamp of the first day
	 * @param {number} until Timestamp of the last day
	 * @return {Promise<object>} Returns addresses with greatest balance in a range of days.
	 */
	this.getGreatestAddressBalanceInterval = function(since, until) {
		return getGreatestAddressBalanceInterval(this._config, since, until);
	};

	/**
	 * @return {Promise<object>} Returns last known stake quantities and the groups that contain Not Participating Balance
	 */
	this.getLastStakeAddress = function() {
		return getLastStakeAddress(this._config);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @return {Promise<object>} Returns information about the specified address
	 */
	this.queryAddress = function(address) {
		return queryAddress(this._config, address);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} count Amount of transactions to return. Limited to values between 1 and 100
	 * @return {Promise<Array>} Returns the latest transactions of the specified account
	 */
	this.queryAddressTransactions = function (address, count) {
		return queryAddressTransactions(this._config, address, count);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} from The starting index number (inclusive)
	 * @param {number} to The ending index number (inclusive)
	 * @return {Promise<Array>} Returns the transactions between the specified indexes of the specified account
	 */
	this.queryAddressTransactionsFromInterval = function(address, from, to) {
		return queryAddressTransactionsFromInterval(this._config, address, from, to);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @return {Promise<Array>} Returns the transactions of the specified account since the specified interval of time
	 */
	this.queryAddressTransactionsSince = function(address, since, until) {
		return queryAddressTransactionsSince(this._config, address, since, until);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @return {Promise<number>} Returns the amount of transactions of the specified account since the specified interval of time
	 */
	this.queryAddressTransactionsSinceCount = function(address, since, until) {
		return queryAddressTransactionsSinceCount(this._config, address, since, until);
	};

	/**
	 * @return {Promise<number>} Returns the amount of available transactions
	 */
	this.queryTransactionsCount = function() {
		return queryTransactionsCount(this._config);
	};

	/**
	 * @param {(string|number)} id Index number or txid string to query
	 * @return {Promise<object>} Returns the transaction based on the specified index or txid
	 */
	this.queryTransactions = function(id) {
		return queryTransactions(this._config, id);
	};

	/**
	 * @param {number} count Amount of transactions to return between 1 and 100
	 * @return {Promise<Array>} Returns the latest transactions
	 */
	this.queryLatestTransactions = function(count) {
		return queryLatestTransactions(this._config, count);
	};

	/**
	 * @param {number} from The starting index number (inclusive)
	 * @param {number} to The ending index number (inclusive)
	 * @return {Promise<Array>} Returns the transactions between the specified indexes
	 */
	this.queryTransactionsFromInterval = function(from, to) {
		return queryTransactionsFromInterval(this._config, from, to);
	};

	/**
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @return {Promise<Array>} Returns the transactions in a date range
	 */
	this.queryTransactionsSince = function(since, until) {
		return queryTransactionsSince(this._config, since, until);
	};

	/**
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @return {Promise<number>} Returns the amount of transactions between the specified UTC timestamps
	 */
	this.queryTransactionsSinceCount = function(since, until) {
		return queryTransactionsSinceCount(this._config, since, until);
	};
};

module.exports = AlgoexplorerApi;
