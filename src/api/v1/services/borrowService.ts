import { Borrow } from "../models/types";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "borrows";

type BorrowData = Omit<Borrow, "id">;
type BorrowWithId = Borrow;

export const borrowService = {
  // Get all borrows
  list: async (): Promise<BorrowWithId[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map(doc => {
      const data = doc.data() as BorrowData;
      return { id: doc.id, ...data };
    });
  },

  // Get a single borrow by Firestore document ID (string)
  getById: async (id: string): Promise<BorrowWithId | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) return null;

    const data = doc.data() as BorrowData;
    return { id: doc.id, ...data };
  },

  // Create a new borrow (defaults status to "BORROWED" if not provided)
  create: async (data: BorrowData): Promise<BorrowWithId> => {
    const payload: BorrowData = {
      ...data,
      status: data.status === "RETURNED" ? "RETURNED" : "BORROWED",
    };

    const id = await createDocument<BorrowData>(COLLECTION, payload);
    const doc = await getDocumentById(COLLECTION, id);

    if (!doc) {
      throw new Error("Failed to retrieve created borrow record");
    }

    const createdData = doc.data() as BorrowData;
    return { id: doc.id, ...createdData };
  },

  // Update an existing borrow by Firestore document ID
  update: async (
    id: string,
    data: Partial<BorrowData>
  ): Promise<BorrowWithId | null> => {
    const existing = await getDocumentById(COLLECTION, id);
    if (!existing) return null;

    await updateDocument<BorrowData>(COLLECTION, id, data);

    const updated = await getDocumentById(COLLECTION, id);
    if (!updated) return null;

    const updatedData = updated.data() as BorrowData;
    return { id: updated.id, ...updatedData };
  },

  // Delete a borrow by Firestore document ID
  remove: async (id: string): Promise<boolean> => {
    const existing = await getDocumentById(COLLECTION, id);
    if (!existing) return false;

    await deleteDocument(COLLECTION, id);
    return true;
  },
};