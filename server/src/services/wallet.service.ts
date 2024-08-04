import { Transaction } from "../models/Transaction";
import { Wallet } from "../models/Wallet";
import { generateUUID } from "../util/crypto";
import { getObjectFromS3, getS3FilePath, putObjectToS3, S3PutPayLoad } from "../util/s3";

export async function getWallet(id: string) {
	const key = getFileName(id);
	return getObjectFromS3(key);
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
