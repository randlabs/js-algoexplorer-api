# js-algoexplorer-api

Algoexplorer SDK is a javascript library for communicating with the Algoexplorer API. 

## Installation

### Nodejs
```bash
npm i -s js-algoexplorer-api
```
Requires [Node.js](https://nodejs.org/) v10+ to run.

### Browser

Include this line in your HTML.
```html
<script src="algoexplorerapi.min.js"/>
```

## Quick Start

```javascript
const AlgoexplorerAPI = require("js-algoexplorer-api");
const api = new AlgoexplorerAPI();
(async () => {
    console.log(await api.status());
})().catch(e => {
    console.log(e);
});
```
## Usage

#### Query address transactions
```javascript
(async () => {
    console.log(await api.queryAddressTransactions(50));
})().catch(e => {
    console.log(e);
});
```

#### Query block by number
```javascript
(async () => {
    console.log(await api.queryBlock(96801));
})().catch(e => {
    console.log(e);
});
```

#### Query transactions from global index
```javascript
(async () => {
    console.log(await api.queryTransactionsFromInterval(150, 201));
})().catch(e => {
    console.log(e);
});
```

#### Send transaction
```javascript
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
```