import { Router } from "express";
import * as c from "../controllers/borrowerController";
import { borrowController } from "../controllers/borrowerController";
import { limiter } from "../middleware/rateLimiter";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
const router = Router();

/**
 * @openapi
 * /borrowers:
 *   get:
 *     summary: Retrieve a list of all borrowers
 *     tags: [Borrowers]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of borrowers to return
 *       - name: membershipType
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [regular, premium, student]
 *         description: Filter borrowers by membership type
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of borrowers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", borrowController.list);

/**
 * @openapi
 * /borrowers/{id}:
 *   get:
 *     summary: Retrieve borrower details by ID
 *     tags: [Borrowers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the borrower
 *     responses:
 *       '200':
 *         description: Borrower found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Borrower not found
 */
router.get("/:id", borrowController.getById);

/**
 * @openapi
 * /borrowers:
 *   post:
 *     summary: Register a new borrower
 *     tags: [Borrowers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice Johnson"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alice@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1-204-555-7890"
 *               membershipType:
 *                 type: string
 *                 enum: [regular, premium, student]
 *                 default: regular
 *     responses:
 *       '201':
 *         description: Borrower created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Invalid input data
 *       '409':
 *         description: Borrower with this email already exists
 */
router.post("/", limiter,borrowController.create);

/**
 * @openapi
 * /borrowers/{id}:
 *   put:
 *     summary: Update borrower details by ID
 *     tags: [Borrowers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the borrower
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Borrower updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Borrower not found
 */
router.put("/:id", authenticate,borrowController.update);

/**
 * @openapi
 * /borrowers/{id}:
 *   delete:
 *     summary: Delete a borrower by ID
 *     tags: [Borrowers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the borrower
 *     responses:
 *       '200':
 *         description: Borrower deleted successfully
 *       '404':
 *         description: Borrower not found
 */
router.delete("/:id", authenticate,isAuthorized({ hasRole: ["admin", "manager"] }),borrowController.remove);

export default router;