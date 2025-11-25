import { Router } from "express";
import { bookController } from "../controllers/bookController";
import { limiter } from "../middleware/rateLimiter";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
const router = Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of books to return
 *       - name: author
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter books by author name
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", bookController.list);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book
 *     responses:
 *       '200':
 *         description: Book found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.get("/:id", bookController.getById);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Add a new book to the collection
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               publishedYear:
 *                 type: integer
 *                 example: 1925
 *               genre:
 *                 type: string
 *                 example: "Classic"
 *     responses:
 *       '201':
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '400':
 *         description: Invalid input data
 */
router.post("/", authenticate,limiter,isAuthorized({ hasRole: ["admin"] }), bookController.create);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update an existing book by its ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.put("/:id",authenticate, bookController.update);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *       '404':
 *         description: Book not found
 */
router.delete("/:id",authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), bookController.remove);

export default router;