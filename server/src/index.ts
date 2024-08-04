// src/index.ts
import express from "express";
import walletRouter from "./routes/wallet.route";

const app = express();
const port = 3000;

app.use(express.json())
app.use("/wallet", walletRouter);
app.get("*", (req, res) => { 
	res.json("HELLO WORLD")
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
