export class WalletUtil {
	constructor(wallet) {
		this.wallet = wallet;
	}

	getWalletId() {
		return this.wallet?._id;
	}

	getTransactions() {
		return WalletUtil.getTransactions(this.wallet);
	}

	getTags() {
		return WalletUtil.getTags(this.wallet);
	}

	getTotalBudget() {
		const transactionRecords = this.getTransactions();
		return WalletUtil.getTotalBudget(transactionRecords);
	}

	getTagTotal() {
		const tags = this.wallet.tags;
		return WalletUtil.getTagTotal(tags);
	}

	getTagTransactions(tag) {
		return WalletUtil.getTagTransactions(tag, this.getTransactions());
	}

	getTotalSpending() {
		return WalletUtil.getTotalSpending(this.getTransactions());
	}

	getTotalMoneyLeft() {
		return WalletUtil.getTotalMoneyLeft(this.getTransactions());
	}

	static getTagTotal(tags) {
		if (!tags) return 0;

		let total = 0;
		for (const tag of tags) {
			total += tag.amount;
		}
		return total;
	}

	static getTags(wallet) {
		return wallet?.tags;
	}

	static getTagAmount(tag) {
		return tag.amount;
	}

	static getTotalBudget(transactionRecords) {
		if (!Array.isArray(transactionRecords)) return 0;
		const creditTransactions = transactionRecords.filter((ele) => ele.type == "CREDIT");

		return creditTransactions.reduce((sum, ele) => sum + ele.amount, 0);
	}

	static getTotalSpending(transactionRecords) {
		if (!Array.isArray(transactionRecords)) return 0;
		const debitTransactions = transactionRecords.filter((ele) => ele.type == "DEBIT");

		return debitTransactions.reduce((sum, ele) => sum + ele.amount, 0);
	}

	static getTotalMoneyLeft(transactionRecords) {
		return WalletUtil.getTotalBudget(transactionRecords) - WalletUtil.getTotalSpending(transactionRecords);
	}

	static getTransactions(wallet) {
		return wallet?.transactions;
	}

	static getTagTransactions(tag, transactionRecords = []) {
		if (!tag) return [];
		return transactionRecords.filter((transactionRecord) => transactionRecord.tag === tag._id);
	}

	canAddTag(tagAmount) {
		return this.getTagTotal(this.wallet) + tagAmount <= this.getTotalBudget(this.wallet);
	}
}
