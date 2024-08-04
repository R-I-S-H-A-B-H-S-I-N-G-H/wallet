import { generateUUID } from "../util/crypto";
import { Transaction } from "./Transaction";

export class Wallet {
	id: string;
	transactionRecord: Array<Transaction>;
	constructor() {
		this.id = generateUUID();
		this.transactionRecord = [];
	}

	addTransaction(transaction: Transaction) {
		this.transactionRecord.push(transaction);
	}

	static toWallet(obj: JSON) {
		return Object.assign(new Wallet(), obj);
	}

	toObject() {
		return JSON.parse(this.toString());
    }
}
