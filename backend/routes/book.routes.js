import express from "express";
import { createBook, getAllBooks, getBookById } from "../controllers/books.cotroller.js";

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", createBook);

export default booksRouter;