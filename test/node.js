const AlgoexplorerApi = require("../index");
const algosdk = require("algosdk");
const client = new AlgoexplorerApi("testnet");


describe("Node operations", function() {
	// eslint-disable-next-line no-invalid-this
	this.timeout(5000);

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
		client.blocksCount()
		.then((blocksCount) => {
			const mnemonic = "obtain extend cheap want ride fatal jungle reject field sell arm apology" +
			" avocado grit ball enough rebuild false celery favorite cook soon talk abandon hope";
			const keys = algosdk.mnemonicToSecretKey(mnemonic);
			const txn = {
				"from": keys.addr,
				"to": "46QNIYQEMLKNOBTQC56UEBBHFNH37EWLHGT2KGL3ZGB4SW77W6V7GBKPDY",
				"fee": 1000,
				"amount": 10000,
				"firstRound": blocksCount + 1,
				"lastRound": blocksCount + 100,
				"genesisID": client.getGenesisId(),
				"genesisHash": client.getGenesisHash(),
				"note": new Uint8Array(0)
			};
			const signedTxn = algosdk.signTransaction(txn, keys.sk);
			const hexa = Buffer.from(signedTxn.blob).toString('hex');
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
