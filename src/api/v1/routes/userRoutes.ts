import { Router } from "express";
import { userController } from "../controllers/userController";
import { limiter } from "../middleware/rateLimiter";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of users to return
 *       - name: role
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [admin, librarian, member]
 *         description: Filter users by role
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", authenticate,  isAuthorized({ hasRole: ["ADMIN","LIBRARIAN"] }),userController.list);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve user details by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       '200':
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: User not found
 */
router.get("/:id", authenticate,  isAuthorized({ hasRole: ["ADMIN","LIBRARIAN"] }),userController.getById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "securePass123"
 *               role:
 *                 type: string
 *                 enum: [admin, librarian, member]
 *                 default: member
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Invalid input data
 *       '409':
 *         description: User with this email already exists
 */
router.post("/", limiter,authenticate ,userController.create)

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user details by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: User not found
 */
router.put("/:id", authenticate,userController.update);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the user
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */
router.delete("/:id", authenticate,  isAuthorized({ hasRole: ["ADMIN","LIBRARIAN","MEMBER"] }),userController.remove);

export default router;