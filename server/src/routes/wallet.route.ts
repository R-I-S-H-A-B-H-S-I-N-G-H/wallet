import { Router } from "express";
import { syncWalletController, getWalletController } from "../controllers/wallet.controller";
const walletRouter = Router();

walletRouter.get("/:id", getWalletController);
walletRouter.post("/", syncWalletController);

export default walletRouter;
