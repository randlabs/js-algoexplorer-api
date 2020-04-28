export type Address = string;
export type TxHash = string;
export type Hexa = string;
export type Network = "mainnet" | "testnet" | "betanet";

export interface Block {
	round: number;
	hash: TxHash;
	txns: TxHash[];
	seed: string;
	prevHash: TxHash;
	proposer: Address;
	reward: number;
	timestamp: number;
}

export interface PayTransaction {
	type: "pay";
	index: number;
	localAssetIndex: number;
	round: number;
	timestamp: number;
	balance?: number;
	txid: TxHash;
	globalIndex?: number;
	from: Address;
	fromIndex: number;
	fromBalance: number;
	accumulatedFromRewards: number;
	fee: number;
	firstRound: number;
	lastRound: number;
	noteb64?: string;
	fromRewards?: number;
	group?: string;
	to: Address;
	toIndex: number;
	amount: number;
	toRewards?: number;
	toBalance: number;
	accumulatedToRewards: number;
	close?: Address;
	closeRewards?: number;
	closeAmount?: number;
	closeBalance?: number;
	closeIndex?: number;
	accumulatedCloseRewards?: number;
}

export interface AssetTransferTransaction {
	type: "axfer";
	index: number;
	localAssetIndex: number;
	round: number;
	timestamp: number;
	balance?: number;
	txid: TxHash;
	globalIndex?: number;
	from: Address;
	fromIndex: number;
	fromBalance: number;
	accumulatedFromRewards: number;
	fee: number;
	firstRound: number;
	lastRound: number;
	noteb64?: string;
	fromRewards?: number;
	group?: string;
	assetID: number;
	sender?: Address;
	fromAssetBalance: number;
	to: Address;
	toIndex: number;
	amount: number;
	toAssetBalance: number;
	close?: Address;
	closeAmount?: number;
	closeAssetBalance?: number;
	closeIndex?: number;
	unitName?: string;
	assetName?: string;
	decimals?: number;
}

export interface AssetConfigurationTransaction {
	type: "acfg";
	index: number;
	localAssetIndex: number;
	round: number;
	timestamp: number;
	balance?: number;
	txid: TxHash;
	globalIndex?: number;
	from: Address;
	fromIndex: number;
	fromBalance: number;
	accumulatedFromRewards: number;
	fee: number;
	firstRound: number;
	lastRound: number;
	noteb64?: string;
	fromRewards?: number;
	group?: string;
	assetID: number;
	creator?: Address;
	total: number;
	defaultFrozen?: boolean;
	unitName?: string;
	assetName?: string;
	url?: string;
	metadataHashb64?: string;
	managerAccount?: Address;
	reserveAccount?: Address;
	freezeAccount?: Address;
	clawbackAccount?: Address;
}

export interface AssetFreezeTransaction {
	type: "afrz";
	index: number;
	localAssetIndex: number;
	round: number;
	timestamp: number;
	balance?: number;
	txid: TxHash;
	globalIndex?: number;
	from: Address;
	fromIndex: number;
	fromBalance: number;
	accumulatedFromRewards: number;
	fee: number;
	firstRound: number;
	lastRound: number;
	noteb64?: string;
	fromRewards?: number;
	group?: string;
	assetID: number;
	account: Address;
	unitName?: string;
	assetName?: string;
	newFreezeStatus: boolean;
}

export interface KeyregTransaction {
	type: "keyreg";
	index: number;
	localAssetIndex: number;
	round: number;
	timestamp: number;
	balance?: number;
	txid: TxHash;
	globalIndex?: number;
	from: Address;
	fromIndex: number;
	fromBalance: number;
	accumulatedFromRewards: number;
	fee: number;
	firstRound: number;
	lastRound: number;
	noteb64?: string;
	fromRewards?: number;
	group?: string;
	keyreg: KeyReg;
}

export type Transaction = PayTransaction | AssetTransferTransaction |
AssetConfigurationTransaction | AssetFreezeTransaction | KeyregTransaction;

export type AssetTransaction = AssetTransferTransaction | AssetConfigurationTransaction |
AssetFreezeTransaction;

export interface KeyReg {
	voteKey: string;
	selectionKey: string;
	voteFirst: number;
	voteLast: number;
	voteKeyDilution: string;
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

export interface PriceStats {
	price: number;
	timestamp: number;
}

export interface AddressInfo {
	address: Address;
	numTxs: number;
	balance: number;
	rewards: number;
	status: "Online" | "Offline";
}

export interface AssetInfo {
	assetID: number;
	unitName?: string;
	assetName?: string;
	url?: string;
	metadataHashb64?: string;
	decimals?: number;
	creator: Address;
	totalSupply: number;
	circulatingSupply: number;
	defaultFrozen: boolean;
	managerAccount: Address;
	reserveAccount: Address;
	freezeAccount: Address;
	clawbackAccount: Address;
	assetReason?: "creation" | "destruction" | "reconfiguration";
}

export interface AssetBalance {
	subscribed: boolean;
	onceSubscribed: boolean;
	balance: number;
	decimals?: number;
	unitName?: string;
	assetName?: string;
	numAssetTxs: number;
	timestamp: number;
}

export default class AlgoexplorerApi {
	constructor();
	constructor(networkName: Network);
	getGenesisId(): string;
	getGenesisHash(): string;
	queryBlocksCount(): Promise<number>;
	queryBlock(roundOrId: number | string): Promise<Block>;
	queryLatestBlocks(count: number): Promise<Block[]>;
	queryBlocksFromInterval(from: number, to: number): Promise<Block[]>;
	queryBlocksByDate(since: number, until?: number): Promise<Block[]>;
	queryBlocksByDate(since: number, until?: number, count?: boolean): Promise<number>;
	queryBlockTransactions(round: number): Promise<Transaction[]>;
	queryStatus(): Promise<Status>;
	queryStats(): Promise<Stats>;
	queryAlgoPrice(): Promise<PriceStats>
	queryAccount(address: Address): Promise<AddressInfo>;
	queryAccountTransactions(address: Address, count: number): Promise<Transaction[]>;
	queryAccountTransactionsFromInterval(address: Address, from: number, to: number): Promise<Transaction[]>;
	queryAccountTransactionsByDate(address: Address, since: number, until?: number): Promise<Transaction[]>;
	queryAccountTransactionsByDate(address: Address, since: number, until?: number, count?: boolean): Promise<number>;
	queryAccountAssets(address: Address): Promise<{ [key: string]: AssetBalance }>;
	queryAccountAssetTransactionsFromInterval(address: Address, assetID: number, from: number, to: number): Promise<AssetTransaction[]>;
	queryTransactionsCount(): Promise<number>;
	queryTransactions(id: number | TxHash): Promise<Transaction>;
	queryLatestTransactions(count: number): Promise<Transaction[]>;
	queryTransactionsFromInterval(from: number, to: number): Promise<Transaction[]>;
	queryTransactionsByDate(since: number, until?: number): Promise<Transaction[]>;
	queryTransactionsByDate(since: number, until?: number, count?: boolean): Promise<number>;
	queryAssetTransactions(assetID: number, count: number): Promise<AssetTransaction[]>;
	queryAssetTransactionsFromInterval(assetID: number, from: number, to: number): Promise<AssetTransaction[]>;
	sendTransaction(hexa: Hexa): Promise<TxHash>;
	queryAssetInfo(assetID: number): Promise<AssetInfo>;
}
