const AlgoexplorerApi = require("../index");
const expect = require("chai").expect;
const client = new AlgoexplorerApi("testnet");

describe("Block operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	it("It should query a block by a round number", function(done) {
		client.queryBlock(3636)
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query a block by a round hash", function(done) {
		client.queryBlock("7MGM3IVHZV4GJTB2Z2Q5DWBNPGFWNJAGQJJRUNNKQ7COUAVE6SDA")
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query block count", function(done) {
		client.queryBlocksCount()
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query a block by a date", function(done) {
		const since = Math.trunc(new Date().getTime() / 1000);
		client.queryBlocksByDate(since)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query a block by a date interval", function(done) {
		const until = Math.trunc(new Date().getTime() / 1000);
		const since = until - 100;
		client.queryBlocksByDate(since, until)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query lastest blocks", function(done) {
		client.queryLatestBlocks(10)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query the block count by a date", function(done) {
		const since = Math.trunc(new Date().getTime() / 1000);
		client.queryBlocksByDate(since, null, true)
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query the block count by a date interval", function(done) {
		const until = Math.trunc(new Date().getTime() / 1000);
		const since = until - 100;
		client.queryBlocksByDate(since, until, true)
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions of a specific block by round number", function(done) {
		client.queryBlockTransactions(3636)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query transactions of a specific block by round hash", function(done) {
		client.queryBlockTransactions("7MGM3IVHZV4GJTB2Z2Q5DWBNPGFWNJAGQJJRUNNKQ7COUAVE6SDA")
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query blocks between a specific rounds", function(done) {
		const from = 100;
		const to = 149;
		client.queryBlocksFromInterval(from, to)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
