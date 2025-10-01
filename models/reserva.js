import { Sequelize, sequelize } from '../config/db.js';

const Reserva = sequelize.define('reserva', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  },
  pessoas: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

sequelize.sync({ force: false })
  .then(() => console.log('Tabela reserva criada com sucesso!'))
  .catch(err => console.error('Erro ao criar tabela reserva:', err));

export default Reserva;
