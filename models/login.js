import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user"
  }
}, {
  tableName: "usuarios",
  timestamps: true 
});

export default Usuario;
