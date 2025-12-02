# Library Management System - Backend API

Backend capstone project for a Library Management System built with **Node.js**, **TypeScript**, **Express**, **Firebase (Auth + Firestore)**, **Joi** for validation, **Morgan** for logging, and **Swagger** for API documentation.

---

## Overview

A RESTful API enabling libraries to manage book inventory and borrowing operations with role-based access control. Supports three user roles: Admin, Librarian, and Member.

---

## Goals & Scope

### Features
- Manage **books** (CRUD operations)
- Manage **borrowing** (borrow/return workflow)
- **Authentication** with Firebase Auth
- **Authorization** with roles: ADMIN, LIBRARIAN, MEMBER
- **Request validation** with Joi
- **API documentation** with Swagger UI


---

## Tech Stack

- **Runtime**: Node.js (LTS), TypeScript
- **Framework**: Express
- **Database**: Firebase Firestore
- **Auth**: Firebase Auth
- **Validation**: Joi
- **Logging**: Morgan
- **Documentation**: Swagger UI

---

## Data Model (Firestore)

### users
```
uid: string
email: string
displayName: string
role: "ADMIN" | "LIBRARIAN" | "MEMBER"
```

### books
```
id: string
title: string
author: string
```

### borrows
```
id: string
bookId: string
userId: string
status: "BORROWED" | "RETURNED"
```

---

## API Routes

### Books (`/api/books`)

- `GET /` — List all books (All roles)
- `GET /:id` — Get book by ID (All roles)
- `POST /` — Create new book (LIBRARIAN, ADMIN)
- `PUT /:id` — Update book (LIBRARIAN, ADMIN)
- `DELETE /:id` — Delete book (ADMIN only)

### Borrows (`/api/borrows`)

- `GET /` — List borrows, filtered by role (All roles)
- `POST /borrow` — Borrow a book: `{ bookId }` (All roles)
- `POST /:id/return` — Return a book (All roles)

### Users (`/api/users`)

- `GET /me` — Get current user profile (All roles)
- `PATCH /:id/role` — Update user role (ADMIN only)

---

## Setup

### Prerequisites
- Node.js installed
- Firebase project 
- Service account key JSON

### Milestones

- **M1**: Project setup & configuration
- **M2**: Authentication & Books API  
- **M3**: Borrowing system implementation
- **M4**: Documentation & completion

### Issues

Create issues for each feature/task tagged to milestones:
- Setup tasks (#1-5)
- Auth & Books (#6-10)
- Borrowing (#11-15)
- Documentation (#16-20)

### CI/CD

- ESLint workflow (`.github/workflows/linting.yml`)
- Runs on push/PR to `development` and `main`

---

## Business Rules

- Books can only be borrowed if `availableCopies > 0`
- Due date is automatically set to 14 days from borrow date
- Only borrowed books can be returned
- Books with active borrows cannot be deleted

---

## What is planned for Milestone 3

- Add advanced features such as filtering, sorting, and improved data validation.
- Implement secure authentication and role-based authorization for protected routes.
- Update and complete all API documentation using Swagger/OpenAPI.
- Clean, organize, and polish the entire project structure for clarity and easy navigation.
- Add and run tests to ensure all critical features work correctly and reliably.

---

## Challenges

- The main Challenges i faced were with the postman. I often got confused on which api to send.
I did not know much about postman and Firebase(in the starting) and where to connect files.

## Solutions

- I learnt the more about postman and firebase, not on how they work, but what they are

## Outcome

- Learnt on API system
- How to run it on the github
- Learnt about github workflows
- Key generation of firebase