import express from "express";
import { createBook } from "../controllers/books.cotroller.js";

const booksRouter = express.Router();

booksRouter.post("/", createBook);

export default booksRouter;