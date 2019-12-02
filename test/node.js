const AlgoexplorerApi = require("../index");
const algosdk = require("algosdk");


describe("Node operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);
	const client = new AlgoexplorerApi("testnet");

	it("It should get the statistics about the blockchain", function(done) {
		client.status()
		.then(() => {
			done();
		})
		.catch((err) => {
			done(err);
		});
	});

	it("It should send transaction", function(done) {
		client.blockCount()
		.then((blockCount) => {
			const mnemonic = "obtain extend cheap want ride fatal jungle reject field sell arm apology" +
			" avocado grit ball enough rebuild false celery favorite cook soon talk abandon hope";
			const keys = algosdk.mnemonicToSecretKey(mnemonic);
			const txn = {
				"to": keys.addr,
				"fee": 1000,
				"amount": 1000,
				"firstRound": blockCount + 1,
				"lastRound": blockCount + 10,
				"genesisID": client.getGenesisId(),
				"genesisHash": client.getGenesisHash()
			};
			// Prepare transaction
			const signedTxn = algosdk.signTransaction(txn, keys.sk);
			const uint8 = algosdk.encodeObj(signedTxn);
			const hexa = Buffer.from(uint8).toString('hex');
			client.sendTransaction(hexa)
			.then(() => {
				done();
			})
			.catch((err) => {
				done(err);
			});
		})
		.catch((err) => {
			done(err);
		});
	});
});
