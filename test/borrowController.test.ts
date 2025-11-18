// import * as controller from "../src/api/v1/controllers/bookController";
// import * as svc from "../src/api/v1/services/bookService";

// describe("borrowController (aligned with current outputs)", () => {
//   const req: any = {};
//   const res: any = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn().mockReturnThis(),
//     send: jest.fn().mockReturnThis(),
//   };

//   afterEach(() => jest.clearAllMocks());

//   test("list returns all items under 'books'", async () => {
//     const items = [{ id: "1" } as any];
//     jest.spyOn(svc, "list").mockResolvedValue(items as any);

//     await controller.list(req, res);

//     expect(res.json).toHaveBeenCalledWith({ books: items });
//   });

//   test("getById returns an item", async () => {
//     req.params = { id: "1" };
//     const item = { id: "1" } as any;
//     jest.spyOn(svc, "get").mockResolvedValue(item as any);

//     await controller.getById(req, res);

//     expect(res.json).toHaveBeenCalledWith(item);
//   });

//   test("getById returns 404 with 'Book not found'", async () => {
//     req.params = { id: "99" };
//     jest.spyOn(svc, "get").mockResolvedValue(null as any);

//     await controller.getById(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
//   });

//   test("create returns 201 with created item", async () => {
//     req.body = { any: "data" };
//     const created = { id: "2" } as any;
//     jest.spyOn(svc, "create").mockResolvedValue(created as any);

//     await controller.create(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(created);
//   });

//   test("update returns updated item", async () => {
//     req.params = { id: "1" };
//     req.body = { any: "data" };
//     const updated = { id: "1" } as any;
//     jest.spyOn(svc, "update").mockResolvedValue(updated as any);

//     await controller.update(req, res);

//     expect(res.json).toHaveBeenCalledWith(updated);
//   });

//   test("update returns 404 with 'Book not found'", async () => {
//     req.params = { id: "7" };
//     req.body = { any: "data" };
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
//     req.params = { id: "7" };
//     jest.spyOn(svc, "remove").mockResolvedValue(false as any);

//     await controller.remove(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
//   });
// });