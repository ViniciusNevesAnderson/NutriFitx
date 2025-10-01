import Mensagem from '../models/faleConosco.js';

const faleConoscoController = {
    listarMensagens: async (req, res) => {
        try {
            const mensagens = await Mensagem.findAll({
                order: [['id', 'ASC']]
            });

            const mensagensConvertidas = mensagens.map(m => {
                const data = new Date(m.data);
                const dataSP = new Date(data.getTime() - 3 * 60 * 60 * 1000);
                return {
                    ...m.toJSON(),
                    dataFormatada: dataSP.toLocaleString('pt-BR')
                };
            });

            res.render('faleConosco', {
                mensagens: mensagensConvertidas
            });
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
            res.status(500).send('Erro ao buscar mensagens: ' + error.message);
        }
    },

    showAddForm: (req, res) => {
        res.render('add_faleConosco');
    },

    addMensagem: async (req, res) => {
        const { nome, email, mensagem } = req.body;
        try {
            const dataSP = new Date(Date.now() - 3 * 60 * 60 * 1000);

            await Mensagem.create({
                nome,
                email,
                mensagem,
                data: dataSP
            });

            res.redirect('/faleConosco');
        } catch (error) {
            console.error("Erro ao adicionar mensagem:", error);
            res.status(500).send('Erro ao adicionar mensagem: ' + error.message);
        }
    },

    showEditForm: async (req, res) => {
        try {
            const id = req.params.id;
            const mensagem = await Mensagem.findByPk(id);
            if (!mensagem) {
                return res.status(404).send('Mensagem não encontrada.');
            }
            res.render('edit_faleConosco', { mensagem: mensagem.toJSON() });
        } catch (error) {
            console.error("Erro ao buscar mensagem para edição:", error);
            res.status(500).send('Erro ao buscar mensagem: ' + error.message);
        }
    },

    updateMensagem: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, email, mensagem } = req.body;
            const [affectedRows] = await Mensagem.update(
                { nome, email, mensagem },
                { where: { id } }
            );
            if (affectedRows === 0) {
                return res.status(404).send('Mensagem não encontrada ou não alterada.');
            }
            res.redirect('/faleConosco');
        } catch (error) {
            console.error("Erro ao atualizar mensagem:", error);
            res.status(500).send('Erro ao atualizar mensagem: ' + error.message);
        }
    },

    deleteMensagem: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await Mensagem.destroy({ where: { id } });
            if (result === 0) {
                return res.status(404).send('Mensagem não encontrada.');
            }
            res.redirect('/faleConosco');
        } catch (error) {
            console.error("Erro ao deletar mensagem:", error);
            res.status(500).send('Erro ao deletar mensagem: ' + error.message);
        }
    }
};

export default faleConoscoController;

