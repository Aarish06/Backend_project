import { db } from "../../../../config/firebaseConfig";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Timestamp
    | FieldValue;