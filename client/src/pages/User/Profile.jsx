import {useContext, useState} from 'react'
import {authContext} from './../../context/AuthContext.jsx'
import useGetProfile from '../hooks/userFetchData.jsx'
import { BASE_URL } from '../../config.js'
import Loading from '../../components/Loader/Loading.jsx'

const Profile = () => {
    const {dispatch} = useContext(authContext)
    const [tab, setTab] = useState('blogs')
    const {data:userData, loading, error} = useGetProfile(`${BASE_URL}/users/${_id}`)
    console.log(userData, 'userdata')
    return (
        <section>
          <div className="max-w-[1170px] px-5 mx-auto">
          {
              <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                  {/* <img src={userData.photo} alt="avatr" className='w-full h-full rounded-full' /> */}
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {/* {userData.name} */}nmk
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {/* {userData.email} */}tesst
                </p>
              </div>
              <div className="mt-[50px] mdLmt-[100px]">
                <button  className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete account</button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                {/* <button onClick={() => setTab('bookings')} className={` ${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                  My Booking
                </button> */}
                {/* <button onClick={() => setTab('settings')} className={` ${tab === 'settings' && 'bg-primaryColor text-white font-normal'} py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                  Profile Settings
                </button> */}
              </div>
              {/* {
                tab === 'bookings' && <MyBooking />
              }
              {
                tab === 'settings' && <Profile user={userData} />
              } */}
            </div>
          </div>
            
          }
        </div>
        </section>
      )
    }

export default Profile