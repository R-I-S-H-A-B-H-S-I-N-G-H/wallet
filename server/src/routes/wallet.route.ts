import { Router } from "express";
import { syncWalletController, getWalletController, createWallet, addTranactionToWallet, addTagToWallet } from "../controllers/wallet.controller";
const walletRouter = Router();

walletRouter.get("/:id", getWalletController);
// walletRouter.post("/", syncWalletController);
walletRouter.post("/", createWallet);
walletRouter.put("/:id/addTransaction", addTranactionToWallet);
walletRouter.put("/:id/addTag", addTagToWallet);

export default walletRouter;
