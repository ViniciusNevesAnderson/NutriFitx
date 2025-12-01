import express from "express";
import dietasController from "../controllers/dietasController.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isLoggedIn, dietasController.mostrarDietas);

export default router;