import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import BackButton from '../components/BackButton.jsx';
import {MdOutlineAddBox} from "react-icons/md";
import { useNavigate, useParams } from 'react-router';

const EditBook = () => {
  const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);

    const createBook = (e, values) => {
        e.preventDefault();
        setLoading(true);
        const book = {title, author, publishYear};
        axios.put('http://localhost:5000/books/'+id, book)
            .then(res => {
                alert("Book updated successfully!");
                navigate('/');
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                alert("Error in updating book!");
                setLoading(false);
            });
    }

  const fetchBook = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books/' + id)
      .then(res => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err)
      });
  }

  useEffect(() => {
    fetchBook();
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4 m-0 mb-4">
        <h1 className='text-2xl my-8'>Books List</h1>
        <BackButton />
      </div>
      {loading ? <Spinner />: null}
        <div className='flex flex-col border border-gray-300 rounded-2xl w-150 p-4 mx-auto'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <input 
            type="text" 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
            placeholder="Book Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <input 
            type="text" 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
            placeholder="Book Author" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <input 
            type="number" 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
            placeholder="Publish Year" 
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div className='my-4'>
            <button onClick={(e) => createBook(e)} className='px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded flex items-center'>
                <MdOutlineAddBox className='mr-2' /> Update Book
            </button>
          </div>
        </div>
    </div>
  )
}

export default EditBook