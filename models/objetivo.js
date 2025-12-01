import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Objetivo = db.define("Objetivo", {
  nome: { type: DataTypes.STRING, allowNull: false },
  peso: { type: DataTypes.FLOAT, allowNull: false },
  altura: { type: DataTypes.FLOAT, allowNull: false },
  duracao: { type: DataTypes.STRING },
  semanas: { type: DataTypes.INTEGER },
  atividade: { type: DataTypes.STRING },
  atividadeTipo: { type: DataTypes.STRING },
  atividadeFrequencia: { type: DataTypes.STRING },
  videos: { type: DataTypes.STRING },
  dieta: { type: DataTypes.STRING },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  dataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "objetivos",
  timestamps: false
});
