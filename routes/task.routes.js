import { Router } from 'express';
import bodyParser from 'body-parser';
import { taskController } from '../controllers/task.controller.js';
import jwt from 'jsonwebtoken';
import  verifyToken  from '../middlewares/token.middleware.js'

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/task/list':
 *  get:
 *     tags:
 *     - Task
 *     summary: Visualizar lista de Tareas
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/list', verifyToken, (req, res) => taskController.get_Task_list(req, res));

/**
 * @openapi
 * '/api/task/view/{id}':
 *   get:
 *     tags:
 *       - Task
 *     summary: Obtener tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tarea por ID
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */

router.get('/view/:id', verifyToken , (req, res) => taskController.get_Task_id(req, res));


/**
 * @openapi
 * '/api/task/create':
 *  post:
 *     tags:
 *     - Task
 *     summary: Crear tarea
 *     parameters:
 *       - in: header
 *         name: auth-token
 *         description: Token de autorización
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - statusTask
 *            properties:
 *              title:
 *                type: string
 *                default: Nombre_tarea
 *              description:
 *                type: string
 *                default: Describe la tarea
 *              statusTask:
 *                type: boolean
 *                default: false
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/create', verifyToken,(req, res) => taskController.post_Task_create(req, res));

/**
 * @openapi
 * '/api/task/update':
 *  put:
 *     tags:
 *     - Task
 *     summary: Actualizar tarea
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - title
 *              - description
 *              - statusTask
 *            properties:
 *              id:
 *                 type: string
 *                 default: "ID_del_anuncio_a_actualizar"
 *              title:
 *                type: string
 *                default: Titulo_tarea
 *              description:
 *                type: string
 *                default: Descripcion_tarea
 *              statusTask:
 *                type: boolean
 *                default: false
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put('/update', verifyToken, (req,res) => taskController.put_Task_update(req,res));


/**
 * @openapi
 * '/api/task/delete':
 *   delete:
 *     tags:
 *       - Task
 *     summary: Eliminar tarea
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: Condición de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 */

router.delete('/delete', verifyToken, (req, res) => taskController.delete_Task(req, res));

export default router;