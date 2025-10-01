import Reserva from '../models/reserva.js';

const reservaController = {
  listarReservas: async (req, res) => {
    try {
      const reservas = await Reserva.findAll({ order: [['id', 'ASC']] });

      const reservasConvertidas = reservas.map(r => {
        const data = new Date(r.data);
        return {
          ...r.toJSON(),
          dataFormatada: data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
      });

      res.render('reserva', { reservas: reservasConvertidas });
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      res.status(500).send('Erro ao buscar reservas: ' + error.message);
    }
  },

  showAddForm: (req, res) => {
    res.render('add_reserva');
  },

  addReserva: async (req, res) => {
    const { nome, email, data, pessoas } = req.body;
    try {
      await Reserva.create({
        nome,
        email,
        data,
        pessoas
      });

      res.redirect('/reserva');
    } catch (error) {
      console.error("Erro ao adicionar reserva:", error);
      res.status(500).send('Erro ao adicionar reserva: ' + error.message);
    }
  },

  deleteReserva: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Reserva.destroy({ where: { id } });
      if (result === 0) {
        return res.status(404).send('Reserva não encontrada.');
      }
      res.redirect('/reserva');
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
      res.status(500).send('Erro ao deletar reserva: ' + error.message);
    }
  }
};

export default reservaController;
