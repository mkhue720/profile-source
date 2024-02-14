import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, token } from '../../config.js';
import useGetProfile from '../hooks/userFetchData.jsx';

const EditUser = () => {
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);
  const { _id: userId } = userData || {};
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    photo: '',
  });
  

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUser({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        photo: userData.photo,
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleImageURLChange = (e) => {
    setUser({ ...user, photo: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${userId}`,
        user,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      navigate('/profile');
      window.location.reload();
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
        <label className='form__label' htmlFor='name'>
          Name:
        </label>
        <input
          className='w-full box-border mb-[15px] p-2.5 rounded-[10px]'
          type='text'
          id='name'
          name='name'
          value={user.name || ''}
          required
          onChange={handleInputChange}
        />
        <label className='form__label' htmlFor='email'>
          Email:
        </label>
        <input
          className='w-full box-border mb-[15px] p-2.5 rounded-[10px]'
          type='text'
          id='email'
          name='email'
          value={user.email || ''}
          required
          onChange={handleInputChange}
        />
        <label className='form__label' htmlFor='image'>
          Ảnh từ URL:
        </label>
        <input
          className='w-full box-border mb-[15px] p-2.5 '
          type='text'
          id='imageUrl'
          name='imageUrl'
          value={user.photo || ''}
          onChange={handleImageURLChange}
        />
        <button className='btn' type='submit'>
          Save Changes
        </button>
      </form>
    </>
  );
};

export default EditUser;
