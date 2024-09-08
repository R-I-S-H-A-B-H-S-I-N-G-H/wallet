import { Router } from "express";
import { createTagController } from "../controllers/tag.controller";
const tagRouter = Router();

tagRouter.post("/", createTagController);

export default tagRouter;
