import express from 'express';
import reservaController from '../controllers/reservaController.js';

const router = express.Router();

router.get('/', reservaController.listarReservas);
router.get('/new', reservaController.showAddForm);
router.post('/new', reservaController.addReserva);
router.post('/delete/:id', reservaController.deleteReserva);

export default router;
