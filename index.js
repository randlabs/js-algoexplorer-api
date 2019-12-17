const { mainnet, testnet, betanet } = require("./src/http/networks");
const { queryBlocksCount, queryBlock, queryLatestBlocks, queryBlocksFromInterval,
	queryBlocksByDate, queryBlockTransactions } = require("./src/block");
const { queryStats } = require("./src/statistics");
const { queryAddress, queryAddressTransactions, queryAddressTransactionsFromInterval,
	queryAddressTransactionsByDate } = require("./src/account");
const { queryTransactionsCount, queryTransactions, queryLatestTransactions,
	queryTransactionsFromInterval, queryTransactionsByDate } = require("./src/transaction");
const { queryStatus, sendTransaction } = require("./src/node");

const { queryRelevantAssets } = require("./src/asset");

/// <reference path="typings/index.d.ts"/>
/**
* @param {string} [networkName] - Network name (mainnet, testnet, betanet)
*/
const AlgoexplorerApi = function(networkName) {

	if (!this) {
		throw new Error('You need to instantiate using the "new" keyword');
	}

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
	 * @return {string} Return the genesis ID
	 */
	this.getGenesisId = function() {
		return this._config.id;
	};

	/**
	 * @return {string} Return the genesis Hash
	 */
	this.getGenesisHash = function() {
		return this._config.genesis;
	};

	/**
	 * @return {Promise<number>} Returns the amount of available blocks
	 */
	this.queryBlocksCount = function () {
		return queryBlocksCount(this._config);
	};

	/**
	* @param {(number|string)} roundOrId A block number or block hash
	* @return {Promise<object>}  Returns the block information based on the specified round or hash
	*/
	this.queryBlock = function (roundOrId) {
		return queryBlock(this._config, roundOrId);
	};

	/**
	 * @param {number} count Amount of blocks to return between 1 and 100
	 * @return {Promise<Array>} Returns the latest blocks
	 */
	this.queryLatestBlocks = function (count) {
		return queryLatestBlocks(this._config, count);
	};

	/**
	 * @param {number} from The starting round number (inclusive)
	 * @param {number} to The ending round number (inclusive)
	 * @return {Promise<Array>} Returns the blocks between the specified rounds
	 */
	this.queryBlocksFromInterval = function(from, to) {
		return queryBlocksFromInterval(this._config, from, to);
	};

	/**
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @param {boolean} [count] If its true, will return the amount of blocks, else, will return an array of blocks
	 * @return {(Promise<Array>|Promise<number>)} Returns the amount of blocks or a blocks array since the specified interval of time
	 */
	this.queryBlocksByDate = function(since, until, count) {
		return queryBlocksByDate(this._config, since, until, count);
	};

	/**
	* @param {(number|string)} round A block number or block hash
	* @return {Promise<Array>}  Returns the transactions of the specified block
	*/
	this.queryBlockTransactions = function(round) {
		return queryBlockTransactions(this._config, round);
	};

	/**
	 * @return {Promise<object>} Returns detailed statistics about the blockchain
	 */
	this.queryStatus = function() {
		return queryStatus(this._config);
	};

	/**
	 * @return {Promise<object>} Returns statistics about the blockchain
	 */
	this.queryStats = function() {
		return queryStats(this._config);
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
	 * @param {boolean} [count] If its true, will return the amount of transactions, else, will return an array of transactions
	 * @return {(Promise<Array>|Promise<number>)} Returns the amount of transactions or a transactions array of 
	 * the specified account since the specified interval of time
	 */
	this.queryAddressTransactionsByDate = function(address, since, until, count) {
		return queryAddressTransactionsByDate(this._config, address, since, until, count);
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
	 * @param {boolean} [count] If its true, will return the amount of transactions, else, will return an array of transactions
	 * @return {(Promise<Array>|Promise<number>)} Returns the amount of transactions or a transactions array between
	 * the specified UTC timestamps
	 */
	this.queryTransactionsByDate = function(since, until, count) {
		return queryTransactionsByDate(this._config, since, until, count);
	};

	/**
	 * @description Sends a RAW transaction to the blockchain
	 * @param {string} hexa The hexa string of the transaction
	 * @return {Promise<string>} Resturns the transaction hash
	 */
	this.sendTransaction = function(hexa) {
		return sendTransaction(this._config, hexa);
	};

	/**
	 * @param {string} address Address that identifies this account
	 * @returns {Promise<Array>} Returns assets that had movements in this account
	 */
	this.queryRelevantAssets = function(address) {
		return queryRelevantAssets(this._config, address);
	}
};

module.exports = AlgoexplorerApi;
