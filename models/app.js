import { DataTypes } from "sequelize";
import db from "../config/db.js";

export const Usuario = db.define("Usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    }
}, {
    tableName: "usuarios",
    timestamps: false
});

db.sync()
  .then(() => console.log("Banco sincronizado!"))
  .catch(err => console.error("Erro ao sincronizar o banco:", err));