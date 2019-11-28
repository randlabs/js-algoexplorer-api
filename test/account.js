const AlgoexplorerApi = require("../index");

describe("Account operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	const client = new AlgoexplorerApi("testnet");

	it("It should query address information", function(done) {
		client.queryAddress("FFJZOPQCYSRZISSJF33MBQJGGTIB2JFUEGBJIY6GXRWEU23ONC65GUZXHM")
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
