import { useState, useContext } from "react"
import {Link, useNavigate} from 'react-router-dom' 
import {BASE_URL} from '../config.js'
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader.js'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import axios from 'axios';
const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/auth/forgotPassword`, { email });
        toast.success(response.data.message);
        setLoading(false);
        navigate('/login');
      } catch (error) {
        toast.error("Unexpected response format");
        setLoading(false);
      }
    };
    console.log('Client current time:', new Date());

    return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>Forgot Password</title>
      <meta name="description" content="Login page" />
    </Helmet>
    </HelmetProvider>
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-primaryColor text-[22px] leading-9 font-bold mb-10">
          Forgot Password
        </h3>
        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input type="email" placeholder="Enter Your Email" name="email" value = {email} onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
          </div>
          <div className="mt-7">
            <button type="submit" 
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              {loading ? <HashLoader size={25} color='#fff' /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}

export default ForgotPassword