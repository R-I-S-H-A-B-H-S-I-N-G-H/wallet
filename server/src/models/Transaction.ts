import { generateUUID } from "../util/crypto";

export class Transaction {
	id: string;
	date: Date;
	tags: Set<string>;
	constructor() {
		this.id = generateUUID();
		this.date = new Date();
		this.tags = new Set();
	}

	addTag(tag: string) {
		this.tags.add(tag);
	}

	removeTag(tag: string) {
		if (!this.tags.has(tag)) return;
		this.tags.delete(tag);
	}

	toJSON() {
		return {
			id: this.id,
			date: this.date.toISOString(), // Convert Date object to a string in ISO format
			tags: Array.from(this.tags), // Convert Set to an array
		};
	}
}
