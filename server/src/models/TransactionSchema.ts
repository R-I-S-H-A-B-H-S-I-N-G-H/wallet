import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	tag: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tag", // Linking to Tag schema
		required: true,
	},
});

const TransactionSchema = mongoose.model("Transaction", transactionSchema);
export = TransactionSchema;
