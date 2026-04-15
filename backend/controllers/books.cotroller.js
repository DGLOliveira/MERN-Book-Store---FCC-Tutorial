import mongoose from "mongoose";
import Book from "../models/book.js";


export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error in getting all books!",error);
        res.status(500).send("Internal Server Error");
    }
}

export const getBookById = async (req,res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send("Invalid Book id!");
        }
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).send("Book not found!");
        }
        res.status(200).json(book);
    } catch (error) {
        console.log("Error in getting book by id!",error);
        res.status(500).send("Internal Server Error");
    }
}

export const createBook = async (req, res) => {
    try {
        const {title, author, publishYear} = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).send("All fields are required!");
        }
        const newBook = new Book({title, author, publishYear});
        await newBook.save();
        res.status(201).json({message:"Book added!"});
    } catch (error) {
        console.log("Error in creating new book!",error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateBookById = async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send("Invalid Book id!");
        }
        if(!req.body){
            return res.status(400).send("No data provided!");
        }
        if(!req.body.title && !req.body.author && !req.body.publishYear){
            return res.status(400).send("No valid data provided!");
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedBook){
            return res.status(404).send("Book not found!");
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        console.log("Error in updating book by id!",error);
        res.status(500).send("Internal Server Error");
    }
}