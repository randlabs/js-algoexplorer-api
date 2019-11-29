const AlgoexplorerApi = require("../index");

describe("Account operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	const client = new AlgoexplorerApi("testnet");

	it("It should query transaction by a specified index", function(done) {
		client.queryTransactions(6363)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transaction by a hash", function(done) {
		client.queryTransactions("QT577XN4UFS755QN7WHYG6WDIQM4ZN7JRT3TTYHH4N2F4S2IJRBQ")
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query the total amount of available transactions", function(done) {
		client.queryTransactionsCount()
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions between the specified indexes", function(done) {
		client.queryTransactionsFromInterval(999, 1009)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions by a date", function(done) {
		const since = new Date().getTime() / 1000;
		client.queryTransactionsSince(since)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions by a range of date", function(done) {
		const until = new Date().getTime() / 1000;
		const since = until - 100;
		client.queryTransactionsSince(since, until)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions count by a date", function(done) {
		const since = new Date().getTime() / 1000;
		client.queryTransactionsSinceCount(since)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions count by a range of date", function(done) {
		const until = new Date().getTime() / 1000;
		const since = until - 100;
		client.queryTransactionsSinceCount(since, until)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query the latest transactions", function(done) {
		client.queryLatestTransactions(10)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
