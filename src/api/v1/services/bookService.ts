import { Book } from "../models/types";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "books";

type BookData = Omit<Book, "id">;
type BookWithId = Book;

export const bookService = {
  // Get all books
  list: async (): Promise<BookWithId[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map(doc => {
      const data = doc.data() as BookData;
      return { id: doc.id, ...data };
    });
  },

  // Get a single book by Firestore document ID (string)
  getById: async (id: string): Promise<BookWithId | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc) return null;

    const data = doc.data() as BookData;
    return { id: doc.id, ...data };
  },

// services/bookService.ts
create: async (data: BookData): Promise<BookWithId> => {
  const payload: BookData = {
    ...data, // spread first
    availableCopies:
      typeof data.availableCopies === "number"
        ? data.availableCopies
        : 1,   // override with a guaranteed number
  };

  const id = await createDocument<BookData>(COLLECTION, payload);
  const doc = await getDocumentById(COLLECTION, id);

  if (!doc) {
    throw new Error("Failed to retrieve created book");
  }

  const createdData = doc.data() as BookData;
  return { id: doc.id, ...createdData };
},

  // Update an existing book by Firestore document ID
  update: async (
    id: string,
    data: Partial<BookData>
  ): Promise<BookWithId | null> => {
    const existing = await getDocumentById(COLLECTION, id);
    if (!existing) return null;

    await updateDocument<BookData>(COLLECTION, id, data);

    const updated = await getDocumentById(COLLECTION, id);
    if (!updated) return null;

    const updatedData = updated.data() as BookData;
    return { id: updated.id, ...updatedData };
  },

  // Delete a book by Firestore document ID
  remove: async (id: string): Promise<boolean> => {
    const existing = await getDocumentById(COLLECTION, id);
    if (!existing) return false;

    await deleteDocument(COLLECTION, id);
    return true;
  },
};