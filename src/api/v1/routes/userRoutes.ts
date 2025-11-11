import { Router } from "express";
import * as c from "../controllers/userController";
const router = Router();

router.get("/", c.list);
router.get("/:id", c.getById);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;