const { mainnet, testnet, betanet } = require("./src/http/networks");
const { queryBlocksCount, queryBlock, queryLatestBlocks, queryBlocksFromInterval,
	queryBlocksByDate, queryBlockTransactions } = require("./src/block");
const { queryStats, queryAlgoStats } = require("./src/statistics");
const { queryAccount, queryAccountTransactions, queryAccountTransactionsFromInterval,
	queryAccountTransactionsByDate, queryAccountAssets,
	queryAccountAssetTransactionsFromInterval } = require("./src/account");
const { queryTransactionsCount, queryTransactions, queryLatestTransactions,
	queryTransactionsFromInterval, queryTransactionsByDate, queryAssetTransactions,
	queryAssetTransactionsFromInterval } = require("./src/transaction");
const { queryStatus, sendTransaction } = require("./src/node");

const { queryAssetInfo } = require("./src/asset");

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
	 * @return {Promise<object>} Returns last known price of Algo in US dollars
	 */
	this.queryAlgoPrice = function() {
		return queryAlgoStats(this._config)
	}

	/**
	 * @param {string} address Address of the account to query
	 * @return {Promise<object>} Returns information about the specified address
	 */
	this.queryAccount = function(address) {
		return queryAccount(this._config, address);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} count Amount of transactions to return. Limited to values between 1 and 100
	 * @return {Promise<Array>} Returns the latest transactions of the specified account
	 */
	this.queryAccountTransactions = function (address, count) {
		return queryAccountTransactions(this._config, address, count);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} from The starting index number (inclusive)
	 * @param {number} to The ending index number (inclusive)
	 * @return {Promise<Array>} Returns the transactions between the specified indexes of the specified account
	 */
	this.queryAccountTransactionsFromInterval = function(address, from, to) {
		return queryAccountTransactionsFromInterval(this._config, address, from, to);
	};

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} since The starting UTC timestamp (inclusive)
	 * @param {number} [until] The ending UTC timestamp (inclusive)
	 * @param {boolean} [count] If its true, will return the amount of transactions, else, will return an array of transactions
	 * @return {(Promise<Array>|Promise<number>)} Returns the amount of transactions or a transactions array of 
	 * the specified account since the specified interval of time
	 */
	this.queryAccountTransactionsByDate = function(address, since, until, count) {
		return queryAccountTransactionsByDate(this._config, address, since, until, count);
	};

	/**
	 * @param {string} address Address that identifies this account
	 * @returns {Promise<object>} Returns assets that had movements in this account
	 */
	this.queryAccountAssets = function(address) {
		return queryAccountAssets(this._config, address);
	}

	/**
	 * @param {string} address Address of the account to query
	 * @param {number} assetID Asset ID of the transactions
	 * @param {number} from The starting index number (inclusive)
	 * @param {number} to The ending index number (inclusive)
	 * @return {Promise<Array>} Returns the asset transactions between the specified indexes of the specified account
	 */
	this.queryAccountAssetTransactionsFromInterval = function(address, assetID, from, to) {
		return queryAccountAssetTransactionsFromInterval(this._config, address, assetID, from, to);
	}

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
	 * @param {number} assetID Asset ID of the transactions
	 * @param {number} count Amount of max coming txs
	 * @return {Promise<Array>} Returns latest {count} transactions of an asset. The list of transactions returned is ordered from least recent transaction to most recent transaction
	 */
	this.queryAssetTransactions = function(assetID, count) {
		return queryAssetTransactions(this._config, assetID, count)
	}

	this.queryAssetTransactionsFromInterval = function(assetID, from, to) {
		return queryAssetTransactionsFromInterval(this._config, assetID, from, to);
	}

	/**
	 * @description Sends a RAW transaction to the blockchain
	 * @param {string} hexa The hexa string of the transaction
	 * @return {Promise<string>} Resturns the transaction hash
	 */
	this.sendTransaction = function(hexa) {
		return sendTransaction(this._config, hexa);
	};

	/**
	 * @param {number} assetID ID of the Asset
	 * @return {Promise<object>} Returns the asset information
	 */
	this.queryAssetInfo = function(assetID) {
		return queryAssetInfo(this._config, assetID);
	}
};

module.exports = AlgoexplorerApi;
