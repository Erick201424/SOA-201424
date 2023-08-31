import { Router } from 'express';
import bodyParser from 'body-parser';
import { userController } from '../controllers/user.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: prueba@gmail.com
 *              password:
 *                type: string
 *                default: prueba141189@
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/login', (req, res) => userController.user_login(req, res));

/**
 * @openapi
 * '/api/user/create':
 *  post:
 *     tags:
 *     - User
 *     summary: Crear usuario
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - lastname
 *              - secondSurname
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                default: nombre(s)
 *              lastName:
 *                type: string
 *                default: primer_apellido
 *              secondSurname:
 *                type: string
 *                default: segundo_apellido
 *              email:
 *                type: string
 *                default: prueba@gmail.com
 *              password:
 *                type: string
 *                default: contraseña
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/create', (req, res) => userController.user_create(req, res));

/**
 * @openapi
 * '/api/user/update/password':
 *  put:
 *     tags:
 *     - User
 *     summary: Actualizar contraseña
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: prueba@gmail.com
 *              password:
 *                type: string
 *                default: prueba141189@
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.put("/update/password", (req,res) => userController.user_update_password(req,res));


export default router;