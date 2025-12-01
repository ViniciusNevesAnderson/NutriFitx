import bcrypt from "bcryptjs";
import { Usuario } from "../models/app.js";

const loginController = {
  loginPage: (req, res) => res.render("login", { layout: false }),

  login: async (req, res) => {
    const { usuario, senha } = req.body;

    try {
      const user = await Usuario.findOne({ where: { usuario } });
      if (!user) return res.render("login", { layout: false, error: "Usuário não encontrado!" });

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) return res.render("login", { layout: false, error: "Senha inválida!" });

      req.session.regenerate(err => {
        if (err) return res.render("login", { layout: false, error: "Erro na sessão, tente novamente." });

        req.session.user = { id: user.id, usuario: user.usuario, role: user.role };

        if (user.role === "admin") return res.redirect("/admin");
        res.redirect("/objetivos/criar");
      });

    } catch (err) {
      console.error(err);
      return res.render("login", { layout: false, error: "Erro no servidor, tente novamente." });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect("/login"));
  }
};

export default loginController;
