const router = require('express').Router();
const PacienteController = require('../Controllers/PacienteController');
const verifyToken = require('../helpers/verify-token');

//---------------- Rotas Privadas ---------------- 
/* Cadastrar um paciente */
router.post('/create', verifyToken, PacienteController.create);
/* Mostrar pacientes do usuário logado */
router.get('/mypacientes', verifyToken, PacienteController.getAllUserPacientes);
/* Deletar um paciente pelo id */
router.delete('/:id', verifyToken, PacienteController.removePatientById);
/* Editar Paciente */
router.patch('/:id', verifyToken, PacienteController.updatePatient);
/** Agendar paciente */
router.patch('/schedule/:id', verifyToken, PacienteController.schedule);
/** Concluir ação */
router.patch('/conclude/:id', verifyToken, PacienteController.concludePaciente);
/* Pacientes atendidos pelo usuário */
router.get('/myAtendimento', verifyToken, PacienteController.getAllUserPacientess);

//---------------- Rotas Públicas ----------------
/* Listar todos os pacientes */
router.get('/', PacienteController.getAll);
/* Listar paciente por id */
router.get('/:id', PacienteController.getPatientById);

module.exports = router;
