import express from "express";
import { setCustomClaims } from "../controllers/customController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/setCustomClaims",
    authenticate,
    isAuthorized({ hasRole: ["ADMIN"] }),
    setCustomClaims
);

export default router;