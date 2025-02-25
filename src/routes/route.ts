import { Router } from 'express';
import { createTask, getTask } from '../controllers/image.controller';
import upload from '../utils/multer';
import setResponseObject from '../config/setResponse';

// instance of Router
const route = Router();

// define route  paths

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - status
 *         - price
 *         - originalPath
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         status:
 *           type: string
 *           description: The status of the task
 *         price:
 *           type: number
 *           description: The price of the task
 *         originalPath:
 *           type: string
 *           description: The original path of the image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was last updated
 *       example:
 *         id: d5fE_asz
 *         status: pending
 *         price: 25.5
 *         originalPath: /input/image.jpg
 *         createdAt: 2025-02-25T09:31:59
 *         updatedAt: 2025-02-25T09:31:59
 * 
 *     Image:
 *       type: object
 *       required:
 *         - resolution
 *         - data
 *         - contentType
 *         - taskId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the image
 *         resolution:
 *           type: string
 *           description: The resolution of the image
 *         data:
 *           type: string
 *           format: binary
 *           description: The binary data of the image
 *         contentType:
 *           type: string
 *           description: The content type of the image
 *         taskId:
 *           type: string
 *           description: The id of the task associated with the image
 *       example:
 *         id: d5fE_asz
 *         resolution: 1024
 *         data: binary data
 *         contentType: image/jpeg
 *         taskId: d5fE_asz
 */

/**
 * @swagger
 * /api/images/tasks:
 *   post:
 *     summary: Create a new image processing task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
route.post("/tasks", setResponseObject, upload.single('file'), createTask);

/**
 * @swagger
 * /api/images/tasks/{taskId}:
 *   get:
 *     summary: Get the status, price, and images of a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 taskId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 price:
 *                   type: number
 *                 images:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
route.get('/tasks/:id', getTask);

export default route;