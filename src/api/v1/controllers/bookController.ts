import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { bookService } from "../services/bookService";

export const bookController = {
  // GET /books
  list: async (_req: Request, res: Response) => {
    const books = await bookService.list();
    return res
      .status(HTTP_STATUS.OK)
      .json({ status: "success", data: books });
  },

  // GET /books/:id
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const book = await bookService.getById(id);

    return book
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: book })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Book not found" });
  },

  // POST /books
  create: async (req: Request, res: Response) => {
    const body = req.body || {};

    const { title, author, availableCopies } = body;

    if (!title || !author) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Missing required fields" });
    }

    const book = await bookService.create({
      title,
      author,
      availableCopies,
    });

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ status: "success", data: book });
  },


  // PUT /books/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const updated = await bookService.update(id, req.body);

    return updated
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: updated })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Book not found" });
  },

  // DELETE /books/:id
  remove: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const success = await bookService.remove(id);

    return success
      ? res
          .status(HTTP_STATUS.OK)
          .json({
            status: "success",
            message: "Book deleted successfully",
          })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "Book not found" });
  },
};