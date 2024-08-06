import { Wallet } from "../models/Wallet";
import { syncWallet, getWallet } from "../services/wallet.service";
import { Request, Response } from "express";

export async function getWalletController(req: Request, res: Response) {
	const response = await getWallet(req.params.id);
	res.json(response);
}
export async function syncWalletController(req: Request, res: Response) {
	const response = await syncWallet(Wallet.toWallet(req.body));
	res.json(response);
}
