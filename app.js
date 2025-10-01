import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import produtoRoutes from './routes/produtoRoutes.js';
import faleConoscoRoutes from './routes/faleConoscoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {}
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('inicio', {
        imagemURL: '/images/restaurante.jpg'
    });
});

app.use('/produtos', produtoRoutes);
app.use('/faleConosco', faleConoscoRoutes);
app.use('/reserva', reservaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
