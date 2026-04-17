import React from 'react'
import { Link } from 'react-router'
import {BsArrowLeft} from 'react-icons/bs'

const BackButton = ({destination = "/"}) => {
  return (
    <Link to={destination}>
        <BsArrowLeft className='text-2xl' />
    </Link>
  )
}

export default BackButton