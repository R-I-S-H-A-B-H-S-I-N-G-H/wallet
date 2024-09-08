import TagSchema from "../models/TagSchema";

export async function createTag(tagPayLoad: any) {
	const { amount, name } = tagPayLoad;
	const tag = new TagSchema({ amount, name });
	try {
		return tag.save();
	} catch (error) {
		return null;
	}
}
