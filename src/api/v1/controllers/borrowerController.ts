import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { borrowService } from "../services/borrowService";

export const borrowController = {
  // GET /borrows
  list: async (_req: Request, res: Response) => {
    const borrows = await borrowService.list();
    return res
      .status(HTTP_STATUS.OK)
      .json({ status: "success", data: borrows });
  },

  // GET /borrows/:id
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const borrow = await borrowService.getById(id);

    return borrow
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: borrow })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Borrow record not found" });
  },

  // POST /borrows
  create: async (req: Request, res: Response) => {
    const body = req.body || {};
    const { bookId, userId, status } = body;

    if (!bookId || !userId) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Missing required fields" });
    }

    const borrow = await borrowService.create({
      bookId,
      userId,
      status,
      borrowedAt: "",
      dueAt: ""
    });

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ status: "success", data: borrow });
  },

  // PUT /borrows/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const updated = await borrowService.update(id, req.body);

    return updated
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: updated })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Borrow record not found" });
  },

  // DELETE /borrows/:id
  remove: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const success = await borrowService.remove(id);

    return success
      ? res
          .status(HTTP_STATUS.OK)
          .json({
            status: "success",
            message: "Borrow record deleted successfully",
          })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Borrow record not found" });
  },
};