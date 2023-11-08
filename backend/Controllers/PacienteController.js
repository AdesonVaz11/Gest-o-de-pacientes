const Paciente = require('../Model/Paciente');
const User = require('../Model/User');
const getToken = require('../Helpers/get-token');
const getUserByToken = require('../Helpers/get-user-by-token');
const jwt = require('jsonwebtoken');

module.exports = class PacienteController {
    static async create(req, res) {
        const { name, age, cpf, description, phone } = req.body;

        const available = true;
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }
        if (!age) {
            res.status(422).json({ message: 'A idade é obrigatória' });
            return;
        }
        if (!cpf) {
            res.status(422).json({ message: 'O CPF é obrigatório' });
            return;
        }
        if (!description) {
            res.status(422).json({ message: 'A descrição é obrigatória' });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return;
        }

        // Pegando o dono do paciente
        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);

        // Criando paciente
        const paciente = new Paciente({
            name: name,
            age: age,
            cpf: cpf,
            description: description,
            phone: phone,
            available: available,
            UserId: currentUser.id
        });

        try {
            // Save the paciente to the database
            const newPaciente = await paciente.save();

            // Handle image uploads
            // const images = req.files;
            // if (images && images.length > 0) {
            //     // Save each image to the ImagePaciente table
            //     for (let i = 0; i < images.length; i++) {
            //         const filename = images[i].filename;
            //         const newImagePaciente = new ImagePaciente({ image: filename, PacienteId: newPaciente.id });
            //         await newImagePaciente.save();
            //     }
            // }

            res.status(201).json({ message: 'Paciente cadastrado com sucesso', newPaciente });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getAll(req, res) {
        const pacientes = await Paciente.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ pacientes: pacientes });
    }

    static async getAllUserPacientes(req, res) {
        // Encontrando o usuário logado
        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);
        currentUser.password = undefined;
        const currentUserId = currentUser.id;

        const pacientes = await Paciente.findAll({
            where: { userId: currentUserId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ pacientes });
    }

    static async getPatientById(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' });
            return;
        }
        // Get paciente by id
        const paciente = await Paciente.findByPk(id);

        // Validating if the ID is valid
        if (!paciente) {
            res.status(422).json({ message: 'Paciente não existe' });
            return;
        }

        res.status(200).json({ paciente: paciente });
    }

    static async removePatientById(req, res) {
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' });
            return;
        }
        // Get paciente by id
        const paciente = await Paciente.findByPk(id);

        // Validating if the ID is valid
        if (!paciente) {
            res.status(422).json({ message: 'Paciente não existe' });
            return;
        }

        // Checar se o usuário logado registrou o paciente
        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);
        currentUser.password = undefined;
        const currentUserId = currentUser.id;

        // if (Number(paciente.userId) !== Number(currentUserId)) {
        //     res.status(422).json({ message: 'ID inválido' });
        //     return;
        // }

        await Paciente.destroy({ where: { id: id } });

        res.status(200).json({ message: 'Paciente removido com sucesso' });
    }

    static async updatePatient(req, res) {
        const id = req.params.id;
        const { name, age, cpf, description, phone } = req.body;

        const updateData = {};
        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            res.status(404).json({ message: 'Paciente não existe!' });
            return;
        }

        // Pegando o dono do paciente
        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);

        if (paciente.UserId !== currentUser.id) {
            res.status(422).json({ message: 'ID inválido!' });
            return;
        }

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return;
        } else {
            updateData.name = name;
        }
        if (!age) {
            res.status(422).json({ message: 'A idade é obrigatória!' });
            return;
        } else {
            updateData.age = age;
        }
        if (!cpf) {
            res.status(422).json({ message: 'O CPF é obrigatório!' });
            return;
        } else {
            updateData.cpf = cpf;
        }
        if (!description) {
            res.status(422).json({ message: 'A descrição é obrigatória!' });
            return;
        } else {
            updateData.description = description;
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' });
            return;
        } else {
            updateData.phone = phone;
        }

        // const images = req.files
        // if (!images || images.length === 0) {
        //     res.status(422).json({ message: "As imagens são obrigatórias!" });
        //     return;
        // } else {
        //     // Atualizar as imagens do paciente
        //     const imageFilenames = images.map((image) => image.filename);
        //     // Remover imagens antigas
        //     await ImagePaciente.destroy({ where: { PacienteId: paciente.id } });
        //     // Adicionar novas imagens
        //     for (let i = 0; i < imageFilenames.length; i++) {
        //         const filename = imageFilenames[i];
        //         const newImagePaciente = new ImagePaciente({ image: filename, PacienteId: paciente.id });
        //         await newImagePaciente.save();
        //     }
        // }

        await Paciente.update(updateData, { where: { id: id } });

        res.status(200).json({ message: 'Atualização com sucesso!' });
    }

    static async schedule(req, res) {
        const id = req.params.id;

        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            res.status(404).json({ message: 'Paciente não existe!' });
            return;
        }

        // Checar se o usuário logado registrou o paciente
        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);

   

        await paciente.save();

        res.status(200).json({ message: `Visita agendada por ${currentUser.name}` });
    }

    static async concludePaciente(req, res) {
        const id = req.params.id;

        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            res.status(404).json({ message: 'Paciente não existe!' });
            return;
        }

        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);

        if (paciente.UserId !== currentUser.id) {
            res.status(422).json({ message: 'ID inválido!' });
            return;
        }

        paciente.available = false;

        await paciente.save(); // Salvando a instância do paciente atualizada.

        res.status(200).json({ message: 'Ação concluída' });
    }

    static async getAllUserPacientess(req, res) {
        // Get usuário pelo token
        let currentUser;
        const token = getToken(req);
        const decoded = jwt.verify(token, 'nossosecret');
        currentUser = await User.findByPk(decoded.id);

        const pacientes = await Paciente.findAll({
            where: { UserId: currentUser.id },
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['name', 'phone'] }]
        });

        res.status(200).json({ pacientes });
    }
};
