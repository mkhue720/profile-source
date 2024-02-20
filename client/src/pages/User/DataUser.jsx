import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../config.js'
import Error from '../../components/Error/Error.jsx'
import useGetProfile from '../hooks/userFetchData.jsx'

const DataUser = () => {
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    photo: '',
  });
  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleImageURLChange = (e) => {
    setUser({ ...user, photo: e.target.value });
  };
  return (
    <>
    <form className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
      <label className='form__label' htmlFor="name">Name: </label>
      <input
        className='w-full box-border mb-[15px] p-2.5 rounded-[10px]'
        type="text"
        id="name"
        name="name"
        value={userData.name || ''}
        required
        onChange={handleInputChange}
      />
      <label className='form__label' htmlFor="email">Email: </label>
      <input
        className='w-full box-border mb-[15px] p-2.5 rounded-[10px]'
        type="text"
        id="email"
        name="email"
        value={userData.email || ''}
        required
        onChange={handleInputChange}
      />
      <label className='form__label' htmlFor="image">Ảnh từ URL:</label>
      <input
        className='w-full box-border mb-[15px] p-2.5 rounded-[10px]'
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={userData.photo || ''}
        onChange={handleImageURLChange}
      />
    </form>
    </>
  )
}

export default DataUser