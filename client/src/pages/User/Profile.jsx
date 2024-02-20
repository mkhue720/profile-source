import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {authContext} from '../../context/AuthContext'
import { BASE_URL, token } from '../../config.js'
import Error from '../../components/Error/Error.jsx'
import Loading from '../../components/Loader/Loading.jsx'
import useGetProfile from '../hooks/userFetchData.jsx'
import DataUser from './DataUser.jsx'
import EditUser from './EditUser.jsx'

const Profile = () => {
  const {dispatch} = useContext(authContext)
  const [tab, setTab] = useState('users')
  const {data:userData, loading, error} = useGetProfile(`${BASE_URL}/users/profile/me`)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/')
    window.location.reload();
  }
  const handleDeleteUser = async (userId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/users/${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        if (response.status !== 200) {
            throw new Error(response.data.message);
        }

        // Remove the deleted user from the local state
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
        console.error('Failed to delete user:', error);
        setError('Failed to delete user. Please try again later.');
    }
};

  return (
    <>
      <section>
        <div className="max-w-[1170px] px-5 mx-auto">
        {
          loading && !error && <Loading />
        }
        {
          error && !loading && <Error errMessage={error} />
        } 
          {
            !loading && !error && ( 
              <div className="grid md:grid-cols-3 gap-10">
                <div className="pb-[50px] px-[30px] rounded-md">
                  <div className="flex items-center justify-center">
                    <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                      <img src={userData.photo} alt="avatar" className='w-full h-full rounded-full' />
                    </figure>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-[18px] leading-[30px] font-bold">
                      {userData.name}
                    </h3>
                    <p className="text-[15px] leading-6 font-medium">
                      {userData.email}
                    </p>
                  </div>
                  <div className="mt-[50px] mdLmt-[100px]">
                    <button onClick={handleLogout}  className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                    <button onClick={() => handleDeleteUser(userData._id)} className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete account</button>
                  </div>
              </div>
              <div className="md:col-span-2 md:px-[30px]">
                <div>
                  <button onClick={() => setTab('data')} className={` ${tab === 'data' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md   font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                    My account
                  </button>
                  <button onClick={() => setTab('edit')} className={` ${tab === 'edit' && 'bg-primaryColor text-white font-normal'} py-2 px-5 rounded-md   font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                    Edit account
                  </button>
                </div>
                {
                  tab === 'edit' && <EditUser />
                }
                {
                  tab === 'data' && <DataUser user={userData} />
                }
              </div>

              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default Profile