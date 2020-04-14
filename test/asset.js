const AlgoexplorerApi = require("../index");
const expect = require("chai").expect;
const client = new AlgoexplorerApi("betanet");

describe("Assets operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	it("It should query the relevant assets of a specific account", function(done) {
		client.queryRelevantAssets("46QNIYQEMLKNOBTQC56UEBBHFNH37EWLHGT2KGL3ZGB4SW77W6V7GBKPDY")
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
