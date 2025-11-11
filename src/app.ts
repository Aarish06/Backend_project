import express, { Express } from "express";
import bookRoutes from "../src/api/v1/routes/bookRoutes";
import userRoutes from "../src/api/v1/routes/userRoutes";
import borrowRoutes from "../src/api/v1/routes/borrowerRoutes";
import setupSwagger from "../config/swagger";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/borrows", borrowRoutes);

setupSwagger(app);

export default app;