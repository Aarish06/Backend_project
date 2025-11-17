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

app.use(express.json())
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/borrows", borrowRoutes);

setupSwagger(app);

export default app;