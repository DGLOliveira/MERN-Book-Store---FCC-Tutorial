import axios from 'axios'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import Spinner from '../components/Spinner.jsx'
import BackButton from '../components/BackButton.jsx'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteBook = () => {
    setLoading(true);
    axios
      .delete('http://localhost:5000/books/' + id)
      .then(res => {
        alert("Book deleted successfully!");
        navigate('/');
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        alert("Error in deleting book!");
        setLoading(false);
        navigate('/');
      });
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white p-4 m-0">
        <h1 className='text-2xl my-8'>Books List</h1>
        <BackButton />
      </div>
      {loading ? (
        <Spinner />
      ):(
        <div
        className="flex justify-center items-center px-4 py-2"
        >
        <button 
        onClick={deleteBook} 
        className="flex flex-col items-center justify-evenly space-y-2 p-4 bg-red-500 hover:bg-red-600 text-white rounded">
          <span>Warning: This action is irreversible!</span>
          <span>Are you sure you want to delete?</span>
          </button>
          </div>
      )}
    </div>
  )
}

export default DeleteBook