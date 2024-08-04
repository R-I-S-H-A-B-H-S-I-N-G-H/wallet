import express from "express";
import walletRouter from "./routes/wallet.route";
import cors from 'cors'
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.use("/wallet", walletRouter);
app.get("*", (req, res) => { 
	res.json("HELLO WORLD")
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

export default app;