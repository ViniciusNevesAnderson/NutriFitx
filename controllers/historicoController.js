import { Objetivo } from "../models/objetivo.js";

const historicoController = {
  mostrarHistorico: async (req, res) => {
    try {
      const metas = await Objetivo.findAll({
        where: { usuarioId: req.session.user.id },
        order: [["dataCriacao", "DESC"]]
      });

      const metasComStatus = metas.map(meta => {
      const inicio = new Date(meta.dataCriacao);
      const duracaoMs = meta.duracao * 7 * 24 * 60 * 60 * 1000;
      const termino = new Date(inicio.getTime() + duracaoMs);
      const status = new Date() <= termino ? "Em andamento" : "Finalizado";

      return {
        nome: meta.nome,
        duracao: meta.duracao,
        status
      };
    });

metasComStatus.sort((a, b) => {
  if (a.status === "Em andamento" && b.status === "Finalizado") return -1;
  if (a.status === "Finalizado" && b.status === "Em andamento") return 1;
  return 0;
});

      res.render("historico", {
        layout: "main",
        usuario: req.session.user.usuario,
        metas: metasComStatus
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
