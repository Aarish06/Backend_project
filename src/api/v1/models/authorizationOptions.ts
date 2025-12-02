export interface AuthorizationOptions {
    hasRole: Array<"ADMIN" | "LIBRARIAN" | "MEMBER">;
    allowSameUser?: boolean;
}