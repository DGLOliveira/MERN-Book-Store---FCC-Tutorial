import express from "express";
import { createBook, getAllBooks, getBookById, updateBookById, deleteBookById } from "../controllers/books.cotroller.js";

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", createBook);
booksRouter.put("/:id", updateBookById);
booksRouter.delete("/:id", deleteBookById);

export default booksRouter;