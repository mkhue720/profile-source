import { useState, useContext } from "react"
import {Link, useNavigate, useParams} from 'react-router-dom' 
import {BASE_URL} from '../config.js'
import {toast} from 'react-toastify'
import { authContext } from "../context/AuthContext.jsx"
import HashLoader from 'react-spinners/HashLoader.js'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import axios from 'axios'

function ResetPassword () {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/auth/resetPassword/${id}/${token}`, {password}, { withCredentials: true })
        .then(res => {
            if(res.data.Status === "Success") {
                toast.success(res.data.message)
                navigate('/login')
               
            }
        }).catch(err => {
            toast.error(err.message)
            setLoading(false)
        })
    }
  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>Reset Password</title>
    </Helmet>
    </HelmetProvider>
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-primaryColor text-[22px] leading-9 font-bold mb-10">
          Reset Password
        </h3>
        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input type="password" placeholder="Enter Your New Password" 
            onChange={(e) => setPassword(e.target.value)}
            name="password" className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
          </div>
          <div className="mt-7">
            <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              {loading ? <HashLoader size={25} color='#fff' /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}

export default ResetPassword