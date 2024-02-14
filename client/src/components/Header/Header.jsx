import React, { useRef, useEffect, useContext, useState } from 'react';
import logo from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { RiHome2Line, RiArticleLine, RiBriefcaseLine, RiPhoneFill } from 'react-icons/ri';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';
const navLinks = [
  {
    path: '/home',
    display: 'Home',
    icon: <RiHome2Line />
  },
  {
    path: '/blog',
    display: 'Blog',
    icon: <RiArticleLine />
  },
  {
    path: '/projects',
    display: 'Projects',
    icon: <RiBriefcaseLine />
  },
  {
    path: '/contact',
    display: 'Contact',
    icon: <RiPhoneFill />
  },
];

const Header = () => {
  const headerRef = useRef(null)
  const menuRef =  useRef(null)
  const {user, role, token} = useContext(authContext)
  const {dispatch} = useContext(authContext)
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleStickyHeader = () => {
    window.addEventListener ('scroll', () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect (() => {
    handleStickyHeader()
    return () => window.removeEventListener('scroll', handleStickyHeader)
  })
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    window.location.reload()
    NavLink('/')
    setIsPopupVisible(false);
  }
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
  return (
    <header className='header flex items-center' ref={headerRef}>
    <div className="container">
      <div className='flex items-center justify-between'>
            {/* LOGO */}
        <div>
          <NavLink to='/'><img src={logo} alt="logo" /></NavLink>
        </div>
            {/* MENU */}
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {
                navLinks.map((link,index) => <li key = {index} className='block'>
                  <NavLink to = {link.path} className={navClass => navClass.isActive 
                    ? 'text-primaryColor text-[16px] leading-7 font-semibold '
                    :'text-whiteColor text-[16px] leading-7 font-semibold hover:text-primaryColor '}
                    >
                      <div className="flex items-center gap-2">
                        <span>{link.icon}</span>
                        <span>{link.display}</span>
                      </div>
                  </NavLink>
                </li>)
              }
          <div className='flex items-center gap-4'>
          {token && user ? (
          <div className="relative">
            <div onClick={() => setIsPopupVisible(!isPopupVisible)}>
              <figure className='w-9 h-9 rounded-full cursor-pointer'>
                <img src={user?.photo} className='w-full h-full rounded-full' alt="avatar" />
              </figure>
            </div>
            {isPopupVisible && (
              <div className="popup absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <Link to={'/profile'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => setIsPopupVisible(false)}>Profile</Link>
                {role === 'admin' && <Link to={'/admin/dashboard'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => setIsPopupVisible(false)}>Dashboard</Link>}
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <div onClick={() => setIsPopupVisible(!isPopupVisible)}>
              <figure className='w-9 h-9 rounded-full cursor-pointer'>
                <img src='https://i.imgur.com/TsP29wm.png' className='w-full h-full rounded-full' alt="avatar" />
              </figure>
            </div>
            {isPopupVisible && (
              <div className="popup absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <Link to={'/login'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => setIsPopupVisible(false)}>Login</Link>
                <Link to={'/register'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => setIsPopupVisible(false)}>Register</Link>
                
              </div>
            )}
          </div>
        )}
            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className = 'w-6 h-6 cursor-pointer' />
            </span>
        </div>
            </ul>
          </div>
              {/* NAV */}
            <div className='flex items-center gap-4'> 
              <span className='md:hidden' onClick={toggleMenu}>
                <BiMenu className = 'w-6 h-6 cursor-pointer' />
              </span>
            </div>     
        </div>
    </div>
  </header>
  )
}

export default Header