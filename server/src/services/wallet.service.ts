import { Transaction } from "../models/Transaction";
import { Wallet } from "../models/Wallet";
import WalletSchema from "../models/WalletSchema";
import { generateUUID } from "../util/crypto";
import { getObjectFromS3, getS3FilePath, putObjectToS3, S3PutPayLoad } from "../util/s3";
import { createTag } from "./tag.service";
import { createTransaction } from "./transaction.service";

export async function getWalletFromS3(id: string) {
	const key = getFileName(id);
	return getObjectFromS3(key);
}

export async function getWalletWithDetails(walletId: any) {
	try {
		// Find the wallet by ID and populate the transactions and tags fields
		const wallet = await WalletSchema.findById(walletId)
			.populate("transactions") // Populate the transactions field
			.populate("tags") // Populate the tags field
			.exec();

		if (!wallet) {
			console.error("Wallet not found");
			return null;
		}

		return wallet;
	} catch (error) {
		console.error("Error fetching wallet with details:", error);
		return null;
	}
}

export async function syncWallet(wallet: Wallet) {
	console.log("WAllet :: ", wallet);

	const s3ResObj = await syncWalletToS3(wallet);
	return getFilePath(wallet.id);
}

async function syncWalletToS3(wallet: Wallet) {
	const filename = getFileName(wallet.id);

	const response = await putObjectToS3(filename, JSON.stringify(wallet), "text/json");
	return response;
}

function getFileName(walletId: string) {
	return `wallet/${walletId}`;
}

function getFilePath(walletId: string) {
	return getS3FilePath(getFileName(walletId));
}

export function getWallet(id: string) {
	try {
		return WalletSchema.findById(id);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function createWalletEntry(walletPayLoad: any) {
	const { name } = walletPayLoad;
	const wallet = new WalletSchema({
		name,
		balance: 0,
		tags: [],
		transactions: [],
	});
	try {
		return wallet.save();
	} catch (error) {
		return null;
	}
}

export async function addTransaction(walletId: string, transactionPayLoad: any) {
	const { amount, date, tag: tagId, name } = transactionPayLoad;

	if (!walletId) {
		console.error("WALLET ID NULL");
		return null;
	}
	const wallet = await getWallet(walletId);

	if (!wallet) {
		console.error("Wallet not found");
		return null;
	}

	// Check if the tag is present in the wallet's tags
	const tagExists = wallet.tags.some((tag) => tag._id.toString() === tagId);
	if (!tagExists) {
		console.error("Tag is not present in the wallet", wallet.tags, tagId);
		return null;
	}

	const transaction = await createTransaction(transactionPayLoad);
	if (!transaction) {
		console.error("ERROR CREATING TRANSACTION");
		return null;
	}
	wallet.transactions.push(transaction?._id);

	try {
		const w = await wallet.save();
		const fullWalletDetails = await getWalletWithDetails(w._id);
		onAddingTransaction(fullWalletDetails);
		return transaction;
	} catch (error) {
		console.error(error);

		return null;
	}
}

export async function addTag(walletId: any, tagPayLoad: any) {
	if (!walletId) {
		console.error("WALLET ID NULL");
		return null;
	}
	const wallet = await getWallet(walletId);

	if (!wallet) {
		console.error("Wallet not found");
		return null;
	}

	const tag = await createTag(tagPayLoad);
	if (!tag) {
		console.error("ERROR CREATING Tag");
		return null;
	}
	wallet.tags.push(tag?._id);

	try {
		const w = await wallet.save();
		const fullWalletDetails = await getWalletWithDetails(w._id);
		onAddingTransaction(fullWalletDetails);
		return tag;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function onAddingTransaction(updatedWallet: any) {
	if (!updatedWallet) return;
	const filename = getFileName(updatedWallet._id);
	const response = await putObjectToS3(filename, JSON.stringify(updatedWallet), "text/json");
	console.log();
	console.log(getFilePath(updatedWallet._id));

	return response;
}
