import Sequelize from 'sequelize';
const sequelize = new Sequelize('restaurante', 'root', 'Theo0220!', {
   host: "localhost",
   dialect: 'mysql'
});
export { Sequelize, sequelize };
