const AlgoexplorerApi = require("../index");
const expect = require("chai").expect;
const client = new AlgoexplorerApi("betanet");

describe("Assets operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	it("It should query the asset information", function(done) {
		client.queryAssetInfo(910)
		.then((res) => {
			expect(res).to.be.a("object");
			done();
		})
		.catch((err) => {
			done(err);
		});
	});
});
