import express from "express";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isLoggedIn, (req, res) => {
  res.render("videos", {
    layout: "main",
    usuario: req.session.user.usuario
  });
});

export default router;
