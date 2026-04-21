import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";


const Home = () => {
    const [display, setDisplay] = useState("table");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/books')
            .then(res => {
                console.log(res.data)
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            });
    }, []);

    const BookRow = ({book, index}) => {
        const { _id, title, author, publishYear } = book;
        return (
            <tr>
                <td className='border border-slate-600 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-600 rounded-md text-center'>{title}</td>
                <td className='border border-slate-600 rounded-md max-md:hidden text-center'>{author}</td>
                <td className='border border-slate-600 rounded-md max-md:hidden text-center'>{publishYear}</td>
                <td className='border border-slate-600 rounded-md flex justify-center items-center gap-1 py-2'>
                    <Link to={`/books/details/${_id}`} className=" text-blue-500 hover:text-blue-600 hover:scale-120 flex items-center">
                        <BsInfoCircle className='mr-2' />
                    </Link>
                    <Link to={`/books/edit/${_id}`} className=" text-orange-500 hover:text-orange-600 hover:scale-120 flex items-center">
                        <AiOutlineEdit className='mr-2' />
                    </Link>
                    <Link to={`/books/delete/${_id}`} className=" text-red-500 hover:text-red-600 hover:scale-120 flex items-center">
                        <MdOutlineDelete className='mr-2' />
                    </Link>
                </td>
            </tr>
        )
    }

    const BookCard = ({book, index}) => {
        const { _id, title, author, publishYear } = book;
        return (
            <div className='w-full md:w-1/3 p-4'>
                <div className="bg-white border border-gray-200 rounded-lg shadow">
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
                        <p className="mb-3 font-normal text-gray-700">{author}</p>
                        <p className="mb-3 font-normal text-gray-700">{publishYear}</p>
                        <div className='flex gap-2'>
                            <Link to={`/books/details/${_id}`} className=" text-blue-500 hover:text-blue-600 hover:scale-120 flex items-center">
                                <BsInfoCircle className='mr-2' />
                            </Link>
                            <Link to={`/books/edit/${_id}`} className=" text-orange-500 hover:text-orange-600 hover:scale-120 flex items-center">
                                <AiOutlineEdit className='mr-2' />
                            </Link>
                            <Link to={`/books/delete/${_id}`} className=" text-red-500 hover:text-red-600 hover:scale-120 flex items-center">
                                <MdOutlineDelete className='mr-2' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center bg-gray-800 text-white p-4 m-0">
                <h1 className='text-2xl my-8'>Books List</h1>
                <div className="flex gap-2">
                    <button onClick={() => setDisplay("table")} className='px-2 py-1 rounded btn bg-sky-600 hover:bg-sky-700 hover:cursor-pointer'>Table</button>
                    <button onClick={() => setDisplay("card")} className='px-2 py-1 rounded btn bg-sky-600 hover:bg-sky-700 hover:cursor-pointer'>Card</button>
                </div>
                <Link to="/books/create" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center">
                    <MdOutlineAddBox className='mr-2' /> Add Book
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : <>
                {display === "card" &&
                    <div className='flex flex-wrap'>
                        {books.map((book, index) => (
                            <Fragment key={book._id}>
                                <BookCard book={book} index={index} />
                            </Fragment>
                        ))}
                    </div>}
                {display === "table" &&
                    <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                            <th className='border border-slate-600 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <Fragment key={book._id}>
                                <BookRow book={book} index={index} />
                            </Fragment>
                        ))}
                    </tbody>
                </table>}
            </>
            }
        </div>

    )
}

export default Home