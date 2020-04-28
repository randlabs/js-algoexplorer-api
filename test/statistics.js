const AlgoexplorerApi = require("../index");
const expect = require("chai").expect;
const client = new AlgoexplorerApi("mainnet");


describe("Statistics operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);

	it("It should get the statistics about the blockchain", function(done) {
		client.queryStats()
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});

	it("It should get algo price", function(done) {
		client.queryAlgoPrice()
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
