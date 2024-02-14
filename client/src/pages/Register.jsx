import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BASE_URL} from '../config.js'
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const Register = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role:'user',
    photo: 'https://i.imgur.com/TsP29wm.png',
  })
  const navigate = useNavigate()
  const handleInputChange = e => {
    setFormData({... formData, [e.target.name]:e.target.value})
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const res = await fetch (`${BASE_URL}/auth/register`, {
        method:'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),        
      })
      const {message} = await res.json()
      if(!res.ok){
        throw new Error(message)
      }
      setLoading(false)
      toast.success(message)
      navigate('/login')
    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }
  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>Register</title>
    </Helmet>
    </HelmetProvider>
    <section className='px-5 xl:px-0'>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
            <h3 className=' text-[22px] leading-9 font-bold mb-10'>
              Create an <span className='text-primaryColor'>account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={handleInputChange} className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
              </div>
              <div className="mb-5">
                <input type="email" placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
              </div>
              <div className="mb-5">
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
              </div>
              <div className="mt-7">
            <button disabled = {loading && true} type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              {loading ? <HashLoader size={35} color='#fff' /> : 'Sign Up'}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Already have an account? <Link to='/login' className="text-primaryColor font-medium ml-1">Login</Link>
          </p>
            </form>
          </div>
    </section>
    </>
  )
}

export default Register