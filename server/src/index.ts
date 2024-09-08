import express from "express";
import walletRouter from "./routes/wallet.route";
import tagRouter from "./routes/tag.route";

import cors from "cors";
import mongoose from "mongoose";
const app = express();
const port = 3000;
import { config } from "dotenv";
config();

const database = process.env.DATABASE || "";
mongoose
	.connect(database)
	.then((res) => console.log("DB connection successfull"))
	.catch((err) => console.error("DB connection fail : ", err));

app.use(cors());
app.use(express.json());
app.use("/wallet", walletRouter);
app.use("/tag", tagRouter);
app.get("*", (req, res) => {
	res.json("HELLO WORLD");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

export default app;
