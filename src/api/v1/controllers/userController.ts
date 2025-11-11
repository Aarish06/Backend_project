import { Request, Response } from "express";
import * as svc from "../services/userService";

export async function list(req: Request, res: Response) {
  res.json({ users: await svc.list() });
}
export async function getById(req: Request, res: Response) {
  const item = await svc.get(req.params.id);
  if (!item) return res.status(404).json({ message: "User not found" });
  res.json(item);
}
export async function create(req: Request, res: Response) {
  const created = await svc.create(req.body);
  res.status(201).json(created);
}
export async function update(req: Request, res: Response) {
  const updated = await svc.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
}
export async function remove(req: Request, res: Response) {
  const ok = await svc.remove(req.params.id);
  if (!ok) return res.status(404).json({ message: "User not found" });
  res.status(204).send();
}