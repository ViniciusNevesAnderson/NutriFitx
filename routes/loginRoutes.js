import express from "express";
import loginController from "../controllers/loginController.js";

const router = express.Router();

router.get("/login", loginController.loginPage);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

export default router;
