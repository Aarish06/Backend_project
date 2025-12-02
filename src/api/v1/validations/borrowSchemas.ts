import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBorrowRequest:
 *       type: object
 *       required:
 *         - bookId
 *         - userId
 *         - status
 *         - borrowedAt
 *         - dueAt
 *       properties:
 *         bookId:
 *           type: string
 *           example: "book001"
 *         userId:
 *           type: string
 *           example: "user9900"
 *         status:
 *           type: string
 *           enum: [BORROWED, RETURNED]
 *         borrowedAt:
 *           type: string
 *           format: date-time
 *         dueAt:
 *           type: string
 *           format: date-time
 *         returnedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 */
export const createBorrowSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  status: Joi.string().valid("BORROWED", "RETURNED").required(),
  borrowedAt: Joi.string().isoDate().required(),
  dueAt: Joi.string().isoDate().required(),
  returnedAt: Joi.string().isoDate().optional(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBorrowRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [BORROWED, RETURNED]
 *         returnedAt:
 *           type: string
 *           format: date-time
 */
export const updateBorrowSchema = Joi.object({
  status: Joi.string().valid("BORROWED", "RETURNED"),
  returnedAt: Joi.string().isoDate(),
}).min(1);

/**
 * @openapi
 * components:
 *   schemas:
 *     BorrowIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "borrow9001"
 */
export const borrowIdParamSchema = Joi.object({
  id: Joi.string().required(),
});
