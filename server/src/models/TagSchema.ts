import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	amount: {
		type: Number,
		required: true,
	},
});

const TagSchema = mongoose.model("Tag", tagSchema);
export = TagSchema;
