import express from "express";
import historicoController from "../controllers/historicoController.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isLoggedIn, historicoController.mostrarHistorico);

export default router;
