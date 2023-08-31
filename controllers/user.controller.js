import { fileURLToPath } from "url";
import { getUser } from "../models/user.model.js";
import { dataEnv } from "../config/env.config.js";
import bodyParser from "body-parser";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

const user_create = async (req, res) => {

    getUser.User.create(
        {
            name: req.body.name,
            lastName: req.body.lastName,
            secondSurname: req.body.secondSurname,
            email: req.body.email,
            password: req.body.password,
        },
        {
            fields: [
                "name",
                "lastName",
                "secondSurname",
                "email",
                "password",
            ],
        }
    )
        .then(newUser => {
            res.send("Usuario registrado:\n" + JSON.stringify(newUser));
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
};

const user_login = async (req, res) => {
    const user = await getUser.User.findOne({ where: { email: req.body.email } });

    if (user) {
        const validPassword = bcryptjs.compareSync(
            req.body.password,
            user.password
        );
        if (validPassword) {
            const token = jwt.sign(
                {
                    id: user.id,
                },
                "secret",
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                    user: user.id,
                },
            });
            console.log("Usuario logeado con éxito");
        } else {
            if (!validPassword)
                return res.status(400).json({ error: "Contraseña incorrecta" });
        }
    } else {
        return res.status(400).json({ error: "Usuario no encontrado" });
    }
};

const user_update_password = (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    let password = bcryptjs.hashSync(pass);
    console.log(password);
    let newDatas = { email, password };
    console.log(newDatas);
    getUser.User.findOne({ where: { email: email } })

        .then((r) => {
            r.update(newDatas);
            res.send("Contraseña actualizada");
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};


export const userController = {
    user_create,
    user_update_password,
    user_login,
};
