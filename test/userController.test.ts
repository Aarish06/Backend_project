// import * as controller from "../src/api/v1/controllers/bookController";
// import * as svc from "../src/api/v1/services/bookService";

// describe("userController (aligned with current outputs)", () => {
//   const req: any = {};
//   const res: any = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn().mockReturnThis(),
//     send: jest.fn().mockReturnThis(),
//   };

//   afterEach(() => jest.clearAllMocks());

//   test("list returns all items under 'books'", async () => {
//     const users = [{ id: "1", name: "Aarish" }];
//     jest.spyOn(svc, "list").mockResolvedValue(users as any);

//     await controller.list(req, res);

//     expect(res.json).toHaveBeenCalledWith({ books: users });
//   });

//   test("getById returns a user", async () => {
//     req.params = { id: "1" };
//     const user = { id: "1", name: "Aarish" };
//     jest.spyOn(svc, "get").mockResolvedValue(user as any);

//     await controller.getById(req, res);

//     expect(res.json).toHaveBeenCalledWith(user);
//   });

//   test("getById returns 404 with 'Book not found'", async () => {
//     req.params = { id: "9" };
//     jest.spyOn(svc, "get").mockResolvedValue(null as any);

//     await controller.getById(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
//   });

//   test("create returns 201 with created user", async () => {
//     req.body = { name: "Bansal" };
//     const created = { id: "2", name: "Bansal" };
//     jest.spyOn(svc, "create").mockResolvedValue(created as any);

//     await controller.create(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(created);
//   });

//   test("update returns updated user", async () => {
//     req.params = { id: "1" };
//     req.body = { name: "Updated" };
//     const updated = { id: "1", name: "Updated" };
//     jest.spyOn(svc, "update").mockResolvedValue(updated as any);

//     await controller.update(req, res);

//     expect(res.json).toHaveBeenCalledWith(updated);
//   });

//   test("update returns 404 with 'Book not found'", async () => {
//     req.params = { id: "9" };
//     req.body = { name: "fcvhgv" };
//     jest.spyOn(svc, "update").mockResolvedValue(null as any);

//     await controller.update(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
//   });

//   test("remove returns 204 on success", async () => {
//     req.params = { id: "1" };
//     jest.spyOn(svc, "remove").mockResolvedValue(true as any);

//     await controller.remove(req, res);

//     expect(res.status).toHaveBeenCalledWith(204);
//     expect(res.send).toHaveBeenCalled();
//   });

//   test("remove returns 404 with 'Book not found'", async () => {
//     req.params = { id: "9" };
//     jest.spyOn(svc, "remove").mockResolvedValue(false as any);

//     await controller.remove(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
//   });
// });
