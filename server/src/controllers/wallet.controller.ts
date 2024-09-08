import { Wallet } from "../models/Wallet";
import { syncWallet, getWalletFromS3, createWalletEntry, addTransaction, addTag } from "../services/wallet.service";
import { Request, Response } from "express";

export async function getWalletController(req: Request, res: Response) {
	const response = await getWalletFromS3(req.params.id);
	res.json(response);
}

export async function syncWalletController(req: Request, res: Response) {
	const response = await syncWallet(Wallet.toWallet(req.body));
	res.json(response);
}

export async function createWallet(req: Request, res: Response) {
	const { name } = req.body;
	const wallet = await createWalletEntry({ name });
	if (!wallet) return res.status(400).json("error");
	res.json(wallet);
}

export async function addTranactionToWallet(req: Request, res: Response) {
	const {} = req.body;
	const wallet = await addTransaction(req.params.id, req.body);
	if (!wallet) return res.status(400).json("error");
	res.json(wallet);
}

export async function addTagToWallet(req: Request, res: Response) {
	const {} = req.body;
	const wallet = await addTag(req.params.id, req.body);
	if (!wallet) return res.status(400).json("error");
	res.json(wallet);
}
