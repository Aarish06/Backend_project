export type Role = "ADMIN" | "LIBRARIAN" | "MEMBER";

export interface Book {
  id: string;
  title: string;
  author: string;
  availableCopies?: number;
}

export type BorrowStatus = "BORROWED" | "RETURNED";

export interface Borrow {
  id: string;
  bookId: string;
  userId: string;
  status: BorrowStatus;
  borrowedAt: string; 
  dueAt: string;      
  returnedAt?: string;
}
