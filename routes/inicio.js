import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const usuario = req.session?.usuario || null;
  const ano = new Date().getFullYear();
  res.render("inicio", { user: usuario, ano });
});

export default router;
