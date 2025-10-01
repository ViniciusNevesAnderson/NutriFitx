import express from 'express';
import faleConoscoController from '../controllers/faleConoscoController.js';

const router = express.Router();

router.get('/', faleConoscoController.listarMensagens);
router.get('/new', faleConoscoController.showAddForm);
router.post('/new', faleConoscoController.addMensagem);
router.get('/edit/:id', faleConoscoController.showEditForm);
router.post('/edit/:id', faleConoscoController.updateMensagem);
router.post('/delete/:id', faleConoscoController.deleteMensagem);

export default router;
