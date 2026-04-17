import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Spinner from '../components/Spinner.jsx'
import BackButton from '../components/BackButton.jsx'


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books/' + id)
      .then(res => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err)
      });
  }, [])
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4 m-0">
        <h1 className='text-2xl my-8'>Books List</h1>
        <BackButton />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col  w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook