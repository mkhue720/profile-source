import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import {RiLinkedinFill} from 'react-icons/ri'
import {AiFillFacebook, AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai'

const socialLinks = [
  {
    path: 'https://www.facebook.com/1485219421',
    icon: <AiFillFacebook className='group-hover:text-white w-4 h-5' />,
  },
  {
    path: 'https://www.youtube.com/@raikichannel',
    icon: <AiFillYoutube className='group-hover:text-white w-4 h-5' />,
  },
  {
    path: 'https://www.youtube.com/@raikichannel',
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5' />,
  },
  {
    path: 'https://www.youtube.com/@raikichannel',
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />,
  },
  {
    path: 'https://www.youtube.com/@raikichannel',
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />,
  },
]
const Footer = () => {
  const year = new Date().getFullYear() 
  return (
    <footer className='pb-16 pt-10'>
      <div className="container mx-auto md:flex md:justify-between">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="logo" />
            <div className="flex flex-col items-center mt-4">
              <p className='text-[16px] leading-7 font-[400] text-textColor mt-4 text-center'>
                Copyright © {year} developed by NMK all right reserved.
              </p>
                <div className='flex items-center gap-3 mt-4'>
                  {socialLinks.map((link, index) => <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  {link.icon}
                </Link>)}
              </div>
            </div>
            
          </div> 
        </div>
      </div>
    </footer>
  )
}

export default Footer