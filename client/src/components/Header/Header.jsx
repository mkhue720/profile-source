import React, { useRef, useEffect, useContext } from 'react';
import logo from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { RiHome2Line, RiArticleLine, RiBriefcaseLine, RiPhoneFill, RiUser3Fill, RiLogoutBoxLine } from 'react-icons/ri';
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
  }
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
  return <header className='header flex items-center' ref={headerRef}>
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
          {
            token && user ? (
            <div>
            <Link to={`${role === 'admin' ? '/admin/dashboard' : '/profile'}`}>
              <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                <img src={user?.photo} className='w-full rounded-full' alt="avatar" />
              </figure>
            </Link>
          </div> 
            ):(
            <Link to='/login'>
              <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                Login
              </button>
            </Link>
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
}

export default Header