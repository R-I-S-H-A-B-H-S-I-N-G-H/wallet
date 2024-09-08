import TransactionSchema from "../models/TransactionSchema";

export async function createTransaction(transactionPayLoad: any) {
	const { amount, date, tag, name, type } = transactionPayLoad;

	try {
		const transaction = new TransactionSchema({ amount, date, tag, name, type });
		return transaction.save();
	} catch (error) {
		return null;
	}
}
