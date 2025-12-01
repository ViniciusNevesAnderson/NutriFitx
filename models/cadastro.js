import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Objetivo from "./objetivo.js";

const Usuario = sequelize.define("Usuario", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" }
}, {
  tableName: "usuarios",
  timestamps: true
});

Usuario.hasMany(Objetivo, { foreignKey: "usuarioId" });
Objetivo.belongsTo(Usuario, { foreignKey: "usuarioId" });

export default Usuario;
