import express from "express";
import objetivoController from "../controllers/objetivoController.js";


const router = express.Router();

router.get("/", objetivoController.criarPage);
router.get("/criar", objetivoController.criarPage);
router.get("/personalizar", objetivoController.personalizarObjetivo);
router.post("/personalizar/salvar", objetivoController.salvarPersonalizado);

export default router;
