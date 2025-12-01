import bcrypt from "bcryptjs";
import { Usuario } from "../models/app.js";

const cadastroController = {
  cadastroPage: (req, res) => res.render("cadastro", { layout: false }),

  cadastro: async (req, res) => {
    const { nome, usuario, email, senha } = req.body;

    try {
      const existeUsuario = await Usuario.findOne({ where: { usuario } });
      if (existeUsuario) return res.render("cadastro", { layout: false, error: "Usuário já existe!" });

      const existeEmail = await Usuario.findOne({ where: { email } });
      if (existeEmail) return res.render("cadastro", { layout: false, error: "E-mail já cadastrado!" });

      const senhaHash = await bcrypt.hash(senha, 10);

      await Usuario.create({ nome, usuario, email, senha: senhaHash, role: "user" });

      return res.render("cadastro", { layout: false, success: "Cadastro realizado com sucesso! Faça login." });

    } catch (err) {
      console.error(err);
      return res.render("cadastro", { layout: false, error: "Erro no servidor, tente novamente." });
    }
  }
};

export default cadastroController;
