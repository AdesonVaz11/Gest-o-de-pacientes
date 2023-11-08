const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserById = require('../helpers/get-user-by-token');

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password, profissao, crm, phone, confirmpassword } = req.body;

        // Validations
        if (!name) {
            res.status(422).json({ message: 'o Nome é obrigatório' });
            return;
        }
        if (!email) {
            res.status(422).json({ message: 'o email é obrigatório' });
            return;
        }
        if (!password) {
            res.status(422).json({ message: 'o password é obrigatório' });
            return;
        }
        if (!profissao) {
            res.status(422).json({ message: 'o profissao é obrigatório' });
            return;
        }
        if (profissao === 0) {
            res.status(422).json({ message: 'o CRM é obrigatório' });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: 'o phone é obrigatório' });
            return;
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'o confirmpassword é obrigatório' });
            return;
        }

        try {
            const userExists = await User.findOne({ where: { email: email } });

            if (userExists) {
                res.status(422).json({ message: 'Email já cadastrado' });
                return;
            }

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await User.create({
                name: name,
                email: email,
                password: passwordHash,
                crm: crm,
                profissao: profissao,
                phone: phone
            });

            await createUserToken(user, req, res);
        } catch (error) {
            res.status(500).json({ message: 'ERRo' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422).json({ message: 'O email e a senha são obrigatórios' });
            return;
        }

        try {
            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                res.status(422).json({ message: 'Email não encontrado' });
                return;
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                res.status(422).json({ message: 'Senha incorreta' });
                return;
            }

            await createUserToken(user, req, res);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async checkUser(req, res) {
        try {
            const token = getToken(req);
            if (!token) {
                res.status(401).json({ message: 'Token não fornecido' });
                return;
            }
            const decoded = jwt.verify(token, 'nossosecret');
            const currentUser = await User.findByPk(decoded.id);

            if (!currentUser) {
                res.status(422).json({ message: 'Usuário não encontrado' });
                return;
            }

            res.status(200).json(currentUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        const id = req.params.id;

        try {
            const user = await User.findByPk(id);

            if (!user) {
                res.status(422).json({ message: 'Usuario não encontrado' });
                return;
            }

            const userWithoutPassword = { ...user.get(), password: undefined };

            res.status(200).json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //editar usuario
    static async editUser(req, res) {
        const id = req.params.id

        //checando se o usuario existe 
        const token = getToken(req)
        const user = await getUserById(token)
        const { name, email, phone, password, crm, confirmpassword } = req.body

        //validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        //checando se o email já está cadastrado
        const userExists = await User.findOne({ where: { email: email } })


        if (user.email !== email && userExists) {
            res.status(422).json({ message: 'Por favor utilize outro email' })
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'O phone é obrigatório' })
            return
        }

        user.phone = phone

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'As senhas não batem' })
            return
        } else if (password === confirmpassword && password != null) {

            //criando nova senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

        }


        const userToUpdate = await User.findByPk(id)

        if (!userToUpdate) {
            res.status(422).json({ message: 'Usuário não encontrado' })
            return
        }

        userToUpdate.name = name
        userToUpdate.email = email
        userToUpdate.crm = crm
        userToUpdate.phone = phone

        if (password === confirmpassword && password != null) {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            userToUpdate.password = passwordHash
        }

        try {
            await userToUpdate.save()
            res.status(200).json({ message: 'Usuário atualizado com successo' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }


    }
};
