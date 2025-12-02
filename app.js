import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import cadastroRoutes from "./routes/cadastroRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import objetivoRoutes from "./routes/objetivoRoutes.js";
import dietasRoutes from "./routes/dietasRoutes.js";
import treinosRoutes from "./routes/treinosRoutes.js";
import historicoRoutes from "./routes/historicoRoutes.js";
import videosRoutes from "./routes/videosRoutes.js";

import { isLoggedIn } from "./middleware/auth.js";
import { Objetivo } from "./models/objetivo.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine("hbs", engine({
  extname: ".hbs",
  helpers: {
    lowercase: (str) => str ? str.toLowerCase().replace(/\s+/g, "") : "",
    formatDate: (date) => date ? new Date(date).toLocaleDateString("pt-BR") : "",
    ifEquals: (a, b, options) => a == b ? options.fn(this) : options.inverse(this),
    eq: (a, b) => a === b,
    statusClass: (status) => {
      if (!status) return "";
      switch (status) {
        case "Concluído": return "blue";
        case "Em andamento": return "green";
        default: return "red";
      }
    }
  }
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "nutrifitx_secret",
  resave: false,
  saveUninitialized: false
}));

app.use(async (req, res, next) => {
  if (req.session.user) {
    try {
      const objetivo = await Objetivo.findOne({
        where: { usuarioId: req.session.user.id },
        order: [["dataCriacao", "DESC"]],
      });
      res.locals.objetivo = objetivo ? objetivo.dataValues : null;
    } catch (err) {
      console.error("Erro ao carregar objetivo global:", err);
      res.locals.objetivo = null;
    }
  } else {
    res.locals.objetivo = null;
  }
  next();
});

app.use("/", cadastroRoutes);
app.use("/", loginRoutes);

app.use("/objetivos", isLoggedIn, objetivoRoutes);
app.use("/dietas", isLoggedIn, dietasRoutes);
app.use("/treinos", isLoggedIn, treinosRoutes);
app.use("/historico", isLoggedIn, historicoRoutes);
app.use("/videos", isLoggedIn, videosRoutes);

app.get("/", async (req, res) => {
  let objetivo = null;

  if (req.session.user) {
    const obj = await Objetivo.findOne({
      where: { usuarioId: req.session.user.id },
      order: [["dataCriacao", "DESC"]],
    });
    objetivo = obj ? obj.dataValues : null;
  }

  res.render("inicio", { 
    user: req.session.user, 
    objetivo 
  });
});

app.use((req, res) => {
  res.status(404).render("404", { layout: "main", message: "Página não encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500", { layout: "main", message: "Erro interno no servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});