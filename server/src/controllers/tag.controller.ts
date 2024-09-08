import { Request, Response } from "express";
import { createTag } from "../services/tag.service";

export async function createTagController(req: Request, res: Response) {
	const tag = await createTag(req.body);
	if (!tag) return res.status(400).json("error");
	res.json(tag);
}
