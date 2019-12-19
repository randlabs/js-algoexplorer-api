const AlgoexplorerApi = require("../index");
const algosdk = require("algosdk");
const client = new AlgoexplorerApi("testnet");


describe("Node operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);

	it("It should get the detailed statistics about the blockchain", function(done) {
		client.queryStatus()
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});

});
