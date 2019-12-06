const AlgoexplorerApi = require("../index");
const client = new AlgoexplorerApi("testnet");


describe("Statistics operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);

	it("It should get the statistics about the blockchain", function(done) {
		client.queryStats()
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
