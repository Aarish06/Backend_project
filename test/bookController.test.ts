import * as controller from "../src/api/v1/controllers/bookController";
import * as svc from "../src/api/v1/services/bookService";

describe("bookController", () => {
  const req: any = {};
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };

  afterEach(() => jest.clearAllMocks());

  test("list returns all books", async () => {
    jest.spyOn(svc, "list").mockResolvedValue([{ id: "1", title: "harry potter" }] as any);
    await controller.list(req, res);
    expect(res.json).toHaveBeenCalledWith({ books: [{ id: "1", title: "harry potter" }] });
  });

  test("getById returns found book", async () => {
    req.params = { id: "1" };
    jest.spyOn(svc, "get").mockResolvedValue({ id: "1", title: "harry potter" } as any);
    await controller.getById(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: "1", title: "harry potter" });
  });

  test("getById returns 404 if not found", async () => {
    req.params = { id: "3" };
    jest.spyOn(svc, "get").mockResolvedValue(null as any);
    await controller.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  test("create returns 201 with created book", async () => {
    req.body = { title: "dracula" };
    jest.spyOn(svc, "create").mockResolvedValue({ id: "2", title: "dracula" } as any);
    await controller.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "2", title: "dracula" });
  });

  test("update returns updated book", async () => {
    req.params = { id: "1" };
    req.body = { title: "Updated" };
    jest.spyOn(svc, "update").mockResolvedValue({ id: "1", title: "Updated" } as any);
    await controller.update(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: "1", title: "Updated" });
  });

  test("update returns 404 for invalid ID", async () => {
    req.params = { id: "3" };
    req.body = { title: "chgvcgh" };
    jest.spyOn(svc, "update").mockResolvedValue(null as any);
    await controller.update(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  test("remove returns 204 when successful", async () => {
    req.params = { id: "1" };
    jest.spyOn(svc, "remove").mockResolvedValue(true as any);
    await controller.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test("remove returns 404 when not found", async () => {
    req.params = { id: "3" };
    jest.spyOn(svc, "remove").mockResolvedValue(false as any);
    await controller.remove(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });
});
