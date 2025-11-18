import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "users";

export const userService = {
  // Get all users
  list: async (): Promise<any[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
  },

  // Get user by uid
  getById: async (uid: string): Promise<any | null> => {
    const doc = await getDocumentById(COLLECTION, uid);
    if (!doc) return null;

    return { uid: doc.id, ...doc.data() };
  },

  // Create user (default role = MEMBER)
  create: async (data: any): Promise<any> => {
    const payload = {
      email: data.email,
      displayName: data.displayName,
      role: data.role ?? "MEMBER",
    };

    const uid = await createDocument(COLLECTION, payload);
    const doc = await getDocumentById(COLLECTION, uid);

    if (!doc) throw new Error("Failed to retrieve created user");

    return { uid: doc.id, ...doc.data() };
  },

  // Update user
  update: async (uid: string, data: any): Promise<any | null> => {
    const exists = await getDocumentById(COLLECTION, uid);
    if (!exists) return null;

    await updateDocument(COLLECTION, uid, data);

    const updated = await getDocumentById(COLLECTION, uid);
    return { uid: updated!.id, ...updated!.data() };
  },

  // Remove user
  remove: async (uid: string): Promise<boolean> => {
    const exists = await getDocumentById(COLLECTION, uid);
    if (!exists) return false;

    await deleteDocument(COLLECTION, uid);
    return true;
  },
};