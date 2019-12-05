export type Address = string;
export type TxHash = string;
export type Hexa = string;

export interface Block {
	round: number;
	hash: TxHash,
	txns: TxHash[],
	seed: string,
	prevHash: TxHash,
	proposer: Address,
	reward: number;
	timestamp: number;
}

export interface Transaction {
	index: number;
	txid: TxHash;
	from: Address;
	fee: number;
	type: "pay" | "keyreg" | "acfg" | "axfer" | "afrz";
	firstRound: number;
	lastRound: number;
	noteb64: string;
	fromIndex: number;
	round: number;
	timestamp: number;
	to?: Address;
	amount?: number;
	toIndex?: number;
	toRewards?: number;
	fromBalance?: number;
	accumulatedFromRewards?: number;
	toBalance?: number;
	accumulatedToRewards?: number;
	close?: Address,
	closeBalance?: number;
	closeAmount?: number;
	accumulatedCloseRewards?: number;
	closeRewards?: number;
}

export interface Options {
	since: number;
	until?: number;
	count?: boolean;
}

export interface Status {
	round: number;
	totalStake: number;
	onlineStake: number;
	offlineStake: number;
	timestamp: number;
	circulatingSupply: number;
}

export interface Stats {
	totalMoney: number;
	onlineMoney: number;
	lastRound: number;
	fee: number;
}

export interface AddressInfo {
	address: Address;
	numTxs: number;
	balance: number;
	rewards: number;
	status: "Online" | "Offline";
}

export default class AlgoexplorerApi {
	constructor();
	constructor(networkName: "mainnet" | "testnet" | "betanet");
	getGenesisId(): string;
	getGenesisHash(): string;
	blocksCount(): Promise<number>;
	queryBlock(round: number): Promise<Block>;
	queryLatestBlocks(amount: number): Promise<Block[]>;
	queryBlocksFromInterval(from: number, to: number): Promise<Block[]>;
	queryBlocksByDate(options: Options): Promise<Block[]|number>;
	queryBlockTransactions(round: number): Promise<Transaction[]>;
	status(): Promise<Status>;
	stats(): Promise<Stats>;
	queryAddress(address: Address): Promise<AddressInfo>;
	queryAddressTransactions(address: Address, count: number): Promise<Transaction[]>;
	queryAddressTransactionsFromInterval(address: Address, from: number, to: number): Promise<Transaction[]>;
	queryAddressTransactionsByDate(address: Address, options: Options): Promise<Transaction[]|number>;
	queryTransactionsCount(): Promise<number>;
	queryTransactions(id: number | TxHash): Promise<Transaction>;
	queryLatestTransactions(count: number): Promise<Transaction[]>;
	queryTransactionsFromInterval(from: number, to: number): Promise<Transaction[]>;
	queryTransactionsByDate(options: Options): Promise<Transaction[]|number>;
	sendTransaction(hexa: Hexa): Promise<TxHash>;
}
