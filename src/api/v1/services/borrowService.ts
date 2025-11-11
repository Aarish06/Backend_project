import { db } from "../../../../config/firebaseConfig";

const col = () => db.collection("borrows");

export async function list() {
  const s = await col().get();
  return s.docs.map(d => ({ id: d.id, ...d.data() }));
}
export async function get(id: string) {
  const d = await col().doc(id).get();
  return d.exists ? { id: d.id, ...d.data() } : null;
}
export async function create(data: { bookId: string; userId: string; status?: "BORROWED" | "RETURNED" }) {
  const payload = { status: "BORROWED", ...data };
  const ref = await col().add(payload);
  const doc = await ref.get();
  return { id: doc.id, ...doc.data() };
}
export async function update(id: string, data: Partial<{ bookId: string; userId: string; status: "BORROWED" | "RETURNED" }>) {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.update(data);
  const out = await ref.get();
  return { id: out.id, ...out.data() };
}
export async function remove(id: string) {
  const ref = col().doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}