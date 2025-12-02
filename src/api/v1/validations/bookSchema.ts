import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBookRequest:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           example: "Atomic Habits"
 *         author:
 *           type: string
 *           example: "James Clear"
 *         availableCopies:
 *           type: integer
 *           example: 5
 */
export const createBookSchema = Joi.object({
  title: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  availableCopies: Joi.number().integer().min(0),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBookRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         availableCopies:
 *           type: integer
 */
export const updateBookSchema = Joi.object({
  title: Joi.string().trim(),
  author: Joi.string().trim(),
  availableCopies: Joi.number().integer().min(0),
}).min(1);

/**
 * @openapi
 * components:
 *   schemas:
 *     BookIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "book123"
 */
export const bookIdParamSchema = Joi.object({
  id: Joi.string().required(),
});
