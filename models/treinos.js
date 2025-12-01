import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Objetivo } from "./objetivo.js";

export const Treino = db.define("Treino", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: DataTypes.TEXT
}, {
  tableName: "treinos",
  timestamps: false
});

Objetivo.hasMany(Treino, { foreignKey: "objetivoId" });
Treino.belongsTo(Objetivo, { foreignKey: "objetivoId" });
