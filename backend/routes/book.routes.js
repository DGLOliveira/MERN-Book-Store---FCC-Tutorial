import express from "express";
import { createBook, getAllBooks } from "../controllers/books.cotroller.js";

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);
booksRouter.post("/", createBook);

export default booksRouter;