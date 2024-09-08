import { Router } from "express";
import { syncWalletController, getWalletController, createWallet, addTranactionToWallet, addTagToWallet, getWalletFromDbController } from "../controllers/wallet.controller";
const walletRouter = Router();

walletRouter.get("/:id", getWalletController);
walletRouter.get("/db/:id", getWalletFromDbController);
// walletRouter.post("/", syncWalletController);
walletRouter.post("/", createWallet);
walletRouter.put("/:id/addTransaction", addTranactionToWallet);
walletRouter.put("/:id/addTag", addTagToWallet);

export default walletRouter;
