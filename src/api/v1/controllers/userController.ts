import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import { userService } from "../services/userService";

export const userController = {
  // GET /users
  list: async (_req: Request, res: Response) => {
    const users = await userService.list();
    return res.status(HTTP_STATUS.OK).json({ status: "success", data: users });
  },

  // GET /users/:id
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const user = await userService.getById(id);

    return user
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: user })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "User not found" });
  },

  // POST /users
  create: async (req: Request, res: Response) => {
    const { email, displayName, role } = req.body;

    if (!email || !displayName) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    const user = await userService.create({ email, displayName, role });

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ status: "success", data: user });
  },

  // PUT /users/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const updated = await userService.update(id, req.body);

    return updated
      ? res.status(HTTP_STATUS.OK).json({ status: "success", data: updated })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "User not found" });
  },

  // DELETE /users/:id
  remove: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "Invalid ID" });
    }

    const success = await userService.remove(id);

    return success
      ? res.status(HTTP_STATUS.OK).json({
          status: "success",
          message: "User deleted successfully",
        })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ status: "error", message: "User not found" });
  },
};