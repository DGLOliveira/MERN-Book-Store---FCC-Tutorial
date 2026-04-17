import express from 'express';
import dotenv from 'dotenv';
import connectdb from './db.js'; 
import booksRouter from './routes/book.routes.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: `http://localhost:5173`
    }));
}
app.use(express.json());

connectdb();

app.use("/books", booksRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});