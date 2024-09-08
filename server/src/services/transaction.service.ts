import TransactionSchema from "../models/TransactionSchema";

export async function createTransaction(transactionPayLoad: any) {
	const { amount, date, tag, name } = transactionPayLoad;
	const transaction = new TransactionSchema({ amount, date, tag, name });

	try {
		return transaction.save();
	} catch (error) {
		return null;
	}
}
