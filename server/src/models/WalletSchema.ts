import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		required: true,
		default: 0,
	},
	transactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Transaction",
		},
	],
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
});

const WalletSchema = mongoose.model("Wallet", walletSchema);
export = WalletSchema;
