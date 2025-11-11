import { db } from "../../../../config/firebaseConfig";
type Role = "ADMIN" | "LIBRARIAN" | "MEMBER";

const col = () => db.collection("users");

export async function list() {
  const s = await col().get();
  return s.docs.map(d => ({ uid: d.id, ...d.data() }));
}
export async function get(uid: string) {
  const d = await col().doc(uid).get();
  return d.exists ? { uid: d.id, ...d.data() } : null;
}
export async function create(data: { email: string; displayName: string; role?: Role }) {
  const ref = col().doc();
  await ref.set({ role: "MEMBER", ...data });
  const doc = await ref.get();
  return { uid: doc.id, ...doc.data() };
}
export async function update(uid: string, data: Partial<{ email: string; displayName: string; role: Role }>) {
  const ref = col().doc(uid);
  const doc = await ref.get();
  if (!doc.exists) return null;
  await ref.set(data, { merge: true });
  const out = await ref.get();
  return { uid: out.id, ...out.data() };
}
export async function remove(uid: string) {
  const ref = col().doc(uid);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}