import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { Objetivo } from "./objetivo.js";

export const Dieta = db.define("Dieta", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carboidratos: DataTypes.TEXT,
  proteinas: DataTypes.TEXT,
  lipideos: DataTypes.TEXT
}, {
  tableName: "dietas",
  timestamps: false
});

Objetivo.hasMany(Dieta, { foreignKey: "objetivoId" });
Dieta.belongsTo(Objetivo, { foreignKey: "objetivoId" });
