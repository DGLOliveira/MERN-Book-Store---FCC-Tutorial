import {useState, useEffect} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import {Link} from 'react-router';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {MdOutlineAddBox, MdOutlineDelete} from "react-icons/md";


const Home = () => {
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

  return (
    <div>
        <div className="flex justify-between items-center bg-gray-800 text-white p-4 m-0">
            <h1 className='text-2xl my-8'>Books List</h1>
            <Link to="/books/create" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center">
                <MdOutlineAddBox className='mr-2' /> Add Book
            </Link>
        </div>
        {loading ? (
            <Spinner />
        ) : (
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
                    <tr key={book._id}>
                        <td className='border border-slate-600 rounded-md text-center'>{index + 1}</td>
                        <td className='border border-slate-600 rounded-md text-center'>{book.title}</td>
                        <td className='border border-slate-600 rounded-md max-md:hidden text-center'>{book.author}</td>
                        <td className='border border-slate-600 rounded-md max-md:hidden text-center'>{book.publishYear}</td>
                        <td className='border border-slate-600 rounded-md flex justify-center items-center gap-1 py-2'>
                            <Link to={`/books/details/${book._id}`} className=" text-blue-500 hover:text-blue-600 hover:scale-120 flex items-center">
                                <BsInfoCircle className='mr-2' />
                            </Link>
                            <Link to={`/books/edit/${book._id}`} className=" text-orange-500 hover:text-orange-600 hover:scale-120 flex items-center">
                                <AiOutlineEdit className='mr-2' />
                            </Link>
                            <Link to={`/books/delete/${book._id}`} className=" text-red-500 hover:text-red-600 hover:scale-120 flex items-center">
                                <MdOutlineDelete className='mr-2' />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        )
        }
    </div>

  )
}

export default Home