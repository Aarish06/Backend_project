import { Request, Response } from "express";
import * as svc from "../services/bookService";

/**
 * Retrieves all books from the system.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response containing an array of all books
 */
export async function list(req: Request, res: Response) {
  res.json({ books: await svc.list() });
}

/**
 * Retrieves a single book by its ID.
 * 
 * @param req - Express request object containing book ID in params
 * @param res - Express response object
 * @returns JSON response with the book if found, else 404 error
 */
export async function getById(req: Request, res: Response) {
  const item = await svc.get(req.params.id);
  if (!item) return res.status(404).json({ message: "Book not found" });
  res.json(item);
}

/**
 * Creates a new book record.
 * 
 * @param req - Express request object containing book data in body
 * @param res - Express response object
 * @returns JSON response with the created book and HTTP 201 status
 */
export async function create(req: Request, res: Response) {
  const created = await svc.create(req.body);
  res.status(201).json(created);
}

/**
 * Updates an existing book by ID.
 * 
 * @param req - Express request object with book ID in params and new data in body
 * @param res - Express response object
 * @returns JSON response with updated book data or 404 if not found
 */
export async function update(req: Request, res: Response) {
  const updated = await svc.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Book not found" });
  res.json(updated);
}

/**
 * Deletes a book by ID.
 * 
 * @param req - Express request object with book ID in params
 * @param res - Express response object
 * @returns HTTP 204 on success or 404 if not found
 */
export async function remove(req: Request, res: Response) {
  const ok = await svc.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "Book not found" });
  res.status(204).send();
}