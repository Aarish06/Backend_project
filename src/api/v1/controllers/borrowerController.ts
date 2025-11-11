import { Request, Response } from "express";
import * as svc from "../services/borrowService";

/**
 * Retrieves all borrow records from the system.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response containing an array of borrow records
 */
export async function list(req: Request, res: Response) {
  res.json({ borrows: await svc.list() });
}

/**
 * Retrieves a specific borrow record by its ID.
 *
 * @param req - Express request object containing borrow ID in params
 * @param res - Express response object
 * @returns JSON response with the borrow record if found, otherwise 404 error
 */
export async function getById(req: Request, res: Response) {
  const item = await svc.get(req.params.id);
  if (!item) return res.status(404).json({ message: "Borrow not found" });
  res.json(item);
}

/**
 * Creates a new borrow record.
 *
 * @param req - Express request object containing borrow data in body
 * @param res - Express response object
 * @returns JSON response with the created borrow record and HTTP 201 status
 */
export async function create(req: Request, res: Response) {
  const created = await svc.create(req.body);
  res.status(201).json(created);
}

/**
 * Updates an existing borrow record by ID.
 *
 * @param req - Express request object containing borrow ID in params and update data in body
 * @param res - Express response object
 * @returns JSON response with updated borrow data or 404 if not found
 */
export async function update(req: Request, res: Response) {
  const updated = await svc.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Borrow not found" });
  res.json(updated);
}

/**
 * Deletes a borrow record by ID.
 *
 * @param req - Express request object containing borrow ID in params
 * @param res - Express response object
 * @returns HTTP 204 on successful deletion or 404 if record not found
 */
export async function remove(req: Request, res: Response) {
  const ok = await svc.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "Borrow not found" });
  res.status(204).send();
}
