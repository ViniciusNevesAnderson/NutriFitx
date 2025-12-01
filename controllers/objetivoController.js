import { Objetivo } from "../models/objetivo.js";

const objetivoController = {
  criarPage: async (req, res) => {
    try {
      const objetivos = await Objetivo.findAll({
        where: { usuarioId: req.session.user.id },
        order: [["dataCriacao", "DESC"]]
      });

      let objetivoEmAndamento = null;

      for (const obj of objetivos) {
        const duracaoMs = obj.duracao * 7 * 24 * 60 * 60 * 1000;
        const termino = new Date(obj.dataCriacao).getTime() + duracaoMs;
        const status = new Date() <= termino ? "Em andamento" : "Finalizado";

        if (status === "Em andamento") {
          objetivoEmAndamento = { ...obj.dataValues, status };
          break;
        }
      }

      let imc = null;
      if (objetivoEmAndamento) {
        const alturaMetros = objetivoEmAndamento.altura / 100;
        if (objetivoEmAndamento.peso > 0 && alturaMetros > 0) {
          imc = (objetivoEmAndamento.peso / (alturaMetros * alturaMetros)).toFixed(2);
        }
      }

      res.render("objetivo", {
        layout: "main",
        usuario: req.session.user.usuario,
        objetivoSelecionado: objetivoEmAndamento ? objetivoEmAndamento.nome : null,
        status: objetivoEmAndamento ? objetivoEmAndamento.status : null,
        peso: objetivoEmAndamento ? objetivoEmAndamento.peso : null,
        altura: objetivoEmAndamento ? objetivoEmAndamento.altura : null,
        imc,
        videos: objetivoEmAndamento ? objetivoEmAndamento.videos : null,
        atividade: objetivoEmAndamento ? objetivoEmAndamento.atividade : null,
        atividadeTipo: objetivoEmAndamento ? objetivoEmAndamento.atividadeTipo : null,
        atividadeFrequencia: objetivoEmAndamento ? objetivoEmAndamento.atividadeFrequencia : null,
        semanas: objetivoEmAndamento ? objetivoEmAndamento.semanas : null,
        dieta: objetivoEmAndamento ? objetivoEmAndamento.dieta : null
      });

    } catch (err) {
      console.error(err);
      res.render("objetivo", {
        layout: "main",
        usuario: req.session.user.usuario,
        error: "Erro ao carregar a página de objetivos."
      });
    }
  },

  personalizarObjetivo: async (req, res) => {
    try {
      res.render("personalizar", {
        layout: "main",
        usuario: req.session.user.usuario
      });
    } catch (err) {
      console.error(err);
      res.render("personalizar", {
        layout: "main",
        usuario: req.session.user.usuario,
        error: "Erro ao carregar a página de personalização."
      });
    }
  },

  salvarPersonalizado: async (req, res) => {
    const { objetivo, peso, altura, duracao, videos, atividade, atividadeTipo, atividadeFrequencia, semanas, dieta } = req.body;

    if (!objetivo || !peso || !altura) {
      return res.render("personalizar", {
        layout: "main",
        usuario: req.session.user.usuario,
        error: "Preencha todos os campos obrigatórios."
      });
    }

    try {
      const objetivos = await Objetivo.findAll({
        where: { usuarioId: req.session.user.id },
        order: [["dataCriacao", "DESC"]]
      });

      let objetivoEmAndamento = false;
      for (const obj of objetivos) {
        const duracaoMs = obj.duracao * 7 * 24 * 60 * 60 * 1000;
        const termino = new Date(obj.dataCriacao).getTime() + duracaoMs;
        const status = new Date() <= termino ? "Em andamento" : "Finalizado";

        if (status === "Em andamento") {
          objetivoEmAndamento = true;
          break;
        }
      }

      if (objetivoEmAndamento) {
        return res.render("personalizar", {
          layout: "main",
          usuario: req.session.user.usuario,
          error: "Você já possui um objetivo em andamento. Finalize-o antes de criar outro."
        });
      }

      await Objetivo.create({
        nome: objetivo,
        usuarioId: req.session.user.id,
        peso,
        altura,
        duracao,
        videos,
        atividade,
        atividadeTipo,
        atividadeFrequencia,
        semanas,
        dieta,
        dataCriacao: new Date()
      });

      res.redirect("/objetivos");

    } catch (err) {
      console.error("Erro ao salvar objetivo:", err);
      res.render("personalizar", {
        layout: "main",
        usuario: req.session.user.usuario,
        error: "Erro ao salvar o objetivo."
      });
    }
  }
};

export default objetivoController;
