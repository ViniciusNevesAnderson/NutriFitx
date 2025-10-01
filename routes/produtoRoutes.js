import express from 'express';
import produtoController from '../controllers/produtoController.js';

const router = express.Router();

router.get('/', produtoController.listAllProducts);
router.get('/new', produtoController.showAddForm);
router.post('/new', produtoController.addNewProduct);
router.get('/edit/:id', produtoController.showEditForm);
router.post('/edit/:id', produtoController.updateProduct);
router.post('/delete/:id', produtoController.deleteProduct);

export default router;