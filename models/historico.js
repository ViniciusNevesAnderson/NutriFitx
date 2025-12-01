import { Objetivo } from "../models/objetivo.js";

const historicoController = {
  mostrarHistorico: async (req, res) => {
    try {
      const objetivos = await Objetivo.findAll({
        where: { usuarioId: req.session.user.id },
        order: [["createdAt", "DESC"]],
      });

      const metas = objetivos.map(obj => {
        const dataCriacao = new Date(obj.createdAt);
        const agora = new Date();
        const duracaoMs = obj.duracao * 7 * 24 * 60 * 60 * 1000;
        const status = agora - dataCriacao >= duracaoMs ? "Finalizado" : "Em andamento";
        return { nome: obj.nome, status };
      });

      res.render("historico", {
        layout: "main",
        usuario: req.session.user.usuario,
        metas
      });

    } catch (err) {
      console.error(err);
      res.render("historico", {
        layout: "main",
        usuario: req.session.user.usuario,
        error: "Erro ao carregar histórico."
      });
    }
  }
};

export default historicoController;
