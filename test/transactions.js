const AlgoexplorerApi = require("../index");
const expect = require("chai").expect;
const client = new AlgoexplorerApi("testnet");

describe("Account operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	it("It should query transaction by a specified index", function(done) {
		client.queryTransactions(6363)
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transaction by a hash", function(done) {
		client.queryTransactions("QT577XN4UFS755QN7WHYG6WDIQM4ZN7JRT3TTYHH4N2F4S2IJRBQ")
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query the total amount of available transactions", function(done) {
		client.queryTransactionsCount()
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions between the specified indexes", function(done) {
		client.queryTransactionsFromInterval(999, 1009)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions by a date", function(done) {
		const since = Math.trunc(new Date().getTime() / 1000);
		client.queryTransactionsByDate(since)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions by a range of date", function(done) {
		const until = Math.trunc(new Date().getTime() / 1000);
		const since = until - 100;
		client.queryTransactionsByDate(since, until)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions count by a date", function(done) {
		const since = Math.trunc(new Date().getTime() / 1000);
		client.queryTransactionsByDate(since, null, true)
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions count by a range of date", function(done) {
		const until = Math.trunc(new Date().getTime() / 1000);
		const since = until - 100;
		client.queryTransactionsByDate(since, until, true)
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query the latest transactions", function(done) {
		client.queryLatestTransactions(10)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
