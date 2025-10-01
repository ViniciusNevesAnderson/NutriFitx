import { Sequelize, sequelize } from '../config/db.js';

const Produtos = sequelize.define('produto', {
   id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
  nome: {
      type: Sequelize.STRING,
      allowNull: false
   },
   preco: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
   }
})
sequelize.sync({force : false})
.then(() => {
   console.log('Tabela produtos criada com sucesso!');
})
.catch((err) => {
   console.error('Erro ao criar tabela produtos:', err);
})
export default Produtos;