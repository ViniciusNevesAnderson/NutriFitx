import express from "express";
import cadastroController from "../controllers/cadastroController.js";

const router = express.Router();

router.get("/cadastro", cadastroController.cadastroPage);
router.post("/cadastro", cadastroController.cadastro);

export default router;
