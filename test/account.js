const AlgoexplorerApi = require("../index");
const expect = require("chai").expect;
const client = new AlgoexplorerApi("testnet");

describe("Account operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	it("It should query address information", function(done) {
		client.queryAddress("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM")
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query latest transactions of specified address", function(done) {
		client.queryAddressTransactions("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM", 10)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query address transactions between specified indexes", function(done) {
		client.queryAddressTransactionsFromInterval("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM", 50, 55)
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query address transacctions by a date", function(done) {
		const since = new Date().getTime() / 1000;
		client.queryAddressTransactionsByDate("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM", { since })
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query address transactions by a date interval", function(done) {
		const until = new Date().getTime() / 1000;
		const since = until - 1000;
		client.queryAddressTransactionsByDate("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM", { since, until })
		.then((res) => {
			expect(res).to.be.a("array");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query address transacctions count by a date", function(done) {
		const since = new Date().getTime() / 1000;
		client.queryAddressTransactionsByDate("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM", { since, count: true })
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
	it("It should query address transacctions count by a date interval", function(done) {
		const until = new Date().getTime() / 1000;
		const since = until - 1000;
		client.queryAddressTransactionsByDate("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM", { since, until, count: true })
		.then((res) => {
			expect(res).to.be.a("number");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
