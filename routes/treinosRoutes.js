import express from "express";
import treinosController from "../controllers/treinosController.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isLoggedIn, treinosController.mostrarTreinos);

export default router;
