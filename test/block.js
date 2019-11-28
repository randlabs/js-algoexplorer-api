const AlgoexplorerApi = require("../index");

describe("Block operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	const client = new AlgoexplorerApi("testnet");

	it("It should query a block by a round number", function(done) {
		client.queryBlock(3636)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query a block by a round hash", function(done) {
		client.queryBlock("7MGM3IVHZV4GJTB2Z2Q5DWBNPGFWNJAGQJJRUNNKQ7COUAVE6SDA")
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get block count", function(done) {
		client.blockCount()
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get a block by a date", function(done) {
		const since = new Date().getTime() / 1000;
		client.queryBlockSince(since)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get a block by a date interval", function(done) {
		const until = new Date().getTime() / 1000;
		const since = until - 100;
		client.queryBlockSince(since, until)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query lastest blocks", function(done) {
		client.queryLatestBlock(10)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get the block count by a date", function(done) {
		const since = new Date().getTime() / 1000;
		client.queryBlockSinceCount(since)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get the block count by a date interval", function(done) {
		const until = new Date().getTime() / 1000;
		const since = until - 100;
		client.queryBlockSinceCount(since, until)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get transactions of a specific block by round number", function(done) {
		client.queryBlockTransactions(3636)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should get transactions of a specific block by round hash", function(done) {
		client.queryBlockTransactions("7MGM3IVHZV4GJTB2Z2Q5DWBNPGFWNJAGQJJRUNNKQ7COUAVE6SDA")
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query blocks between a specific rounds", function(done) {
		const from = 100;
		const to = 149;
		client.queryBlockFromInterval(from, to)
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});

