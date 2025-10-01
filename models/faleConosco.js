import { Sequelize, sequelize } from '../config/db.js';

const Mensagem = sequelize.define('Mensagem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabela mensagem criada com sucesso!');
    })
    .catch((err) => {
        console.error('Erro ao criar tabela Mensagem:', err);
    });

export default Mensagem;
