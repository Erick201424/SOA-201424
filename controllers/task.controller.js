import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import { getTask } from "../models/task.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});

const get_Task_id = async function (req, res) {
    let id = req.params.id;

    getTask.Task.findAll({ 
        where: { id: id, deletedAt: null },
        attributes: ["title", "description", "statusTask"]
    })
        .then((response) => {
            if (response.length === 0) {
                res.status(404).json({ message: 'La tarea no existe' });
            } else {
                const statusMsg = response[0].statusTask ? 'Tarea completada' : 'Tarea incompleta';
                const responses = {
                    ...response[0].toJSON(),
                    statusMsg: statusMsg
                };
            res.send(responses);
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

const get_Task_list = async function (req, res) {
    getTask.Task
        .findAll({
            attributes: ["id", "title", "description", "statusTask"],
            where: { deletedAt: null }
        })
        .then((response) => {
            if (response.length === 0) {
                res.status(404).json({ message: 'No hay tareas' });
            } else {
                const responses = response.map(response => {
                    const statusMsg = response.statusTask ? 'Tarea completada' : 'Tarea incompleta';
                    return {
                        ...response.toJSON(),
                        statusMsg: statusMsg
                    };
                });
                res.send(responses);
            }
        })
        .catch((err) => {
            res.status(400).send({err: "Error al obtener la lista"});
        })
};

const post_Task_create = (req, res) => {
    getTask.Task.create(
        {
            title: req.body.title,
            description: req.body.description,
            statusTask: req.body.statusTask,
        },
        {
            fields: ["title", "description", "statusTask"]
        })
        .then((newTask) => {
            res.send("Tarea registrada:\n" + JSON.stringify(newTask));

        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
}

const put_Task_update = async (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let statusTask = req.body.statusTask;

    let newDatas = { id, title, description, statusTask };
    getTask.Task.findOne({ where: { id: id, deletedAt: null } })

        .then((r) => {
            r.update(newDatas);
            res.send("Tarea actualizada\n" + JSON.stringify(r))
        })
        .catch((err) => {
            res.status(400).send({err: "Error al actualizzar la tarea"});
        });
};

const delete_Task = async (req, res) => {
    let id = req.query.id;

    try {
        const result = await getTask.Task.update(
            { deletedAt: new Date() }, 
            { where: { id: id, deletedAt: null } } 
        );

        if (result[0] === 1) {
            res.status(200).json({ message: "Registro marcado como eliminado" });
        } else {
            res.status(404).json({ message: "Registro no encontrado o ya marcado como eliminado" });
        }
    } catch (err) {
        res.status(400).json({ err: 'Error al marcar como eliminado' });
    }
}

export const taskController = {
    get_Task_id,
    get_Task_list,
    post_Task_create,
    put_Task_update,
    delete_Task
};