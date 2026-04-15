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