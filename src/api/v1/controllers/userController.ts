import { Request, Response } from "express";
import * as svc from "../services/userService";

/**
 * Fetches all users from the system.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response containing an array of all users
 */
export async function list(req: Request, res: Response) {
  res.json({ users: await svc.list() });
}

/**
 * Retrieves a single user by their ID.
 *
 * @param req - Express request object containing user ID in params
 * @param res - Express response object
 * @returns JSON response with the user data if found, else 404 error
 */
export async function getById(req: Request, res: Response) {
  const item = await svc.get(req.params.id);
  if (!item) return res.status(404).json({ message: "User not found" });
  res.json(item);
}

/**
 * Creates a new user record.
 *
 * @param req - Express request object containing new user data in body
 * @param res - Express response object
 * @returns JSON response with the created user and HTTP 201 status
 */
export async function create(req: Request, res: Response) {
  const created = await svc.create(req.body);
  res.status(201).json(created);
}

/**
 * Updates an existing user record by ID.
 *
 * @param req - Express request object with user ID in params and updated data in body
 * @param res - Express response object
 * @returns JSON response with updated user data or 404 if user not found
 */
export async function update(req: Request, res: Response) {
  const updated = await svc.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
}

/**
 * Deletes a user record by ID.
 *
 * @param req - Express request object with user ID in params
 * @param res - Express response object
 * @returns HTTP 204 status on successful deletion or 404 if user not found
 */
export async function remove(req: Request, res: Response) {
  const ok = await svc.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "User not found" });
  res.status(204).send();
}