import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Role:
 *       type: string
 *       enum:
 *         - ADMIN
 *         - LIBRARIAN
 *         - MEMBER
 *       example: "ADMIN"
 */
export const roleSchema = Joi.string().valid("ADMIN", "LIBRARIAN", "MEMBER");

/**
 * @openapi
 * components:
 *   schemas:
 *     IdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "generic123"
 */
export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});
