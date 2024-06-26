const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt_config = require("../../configs/jwt")

const Controller = {
    signup: async (req, res) => {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        try {
            const userExists = await User.findOneByEmail(email.toLowerCase());
            if (userExists) {
                return res.status(400).json({ message: "A user with this email already exist."})
            }
            const hashPassword = await bcrypt.hashSync(password, 8);
            const newUser = {
                // id: uuidv4(),
                name: name,
                email: email.toLowerCase(),
                password: hashPassword,
                role: role, 
            };
            await User.createUser(newUser);
            return res.status(200).json({ message: "User created successfully."  })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOneByEmail(email.toLowerCase());
            if (!user) {
                return res.status(404).json({ message: "User with this email does not exist."})
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return res.status(401).json({ message: "Invalid password."})
            }
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwt_config.jwt_secret, {
                expiresIn: jwt_config.jwt_expiresIn
            });
            return res.status(200).json({ auth: true, token: token });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server Error."})
        }
    }
};

module.exports = Controller;