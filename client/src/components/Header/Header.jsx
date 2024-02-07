import React, { useRef, useEffect, useContext } from 'react';
import logo from '../../assets/img/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { RiHome2Line, RiArticleLine, RiBriefcaseLine, RiPhoneFill, RiUser3Fill, RiLogoutBoxLine } from 'react-icons/ri';
import { BiMenu, BiExtension } from 'react-icons/bi';
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
    path: '/extensions',
    display: 'Extensions',
    icon: <BiExtension />
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
          <img src={logo} alt="logo" />
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
              {
                token && user ? (
                  <NavLink  onClick={handleLogout} className={navClass => navClass.isActive 
                    ? 'text-primaryColor text-[16px] leading-7 font-semibold '
                    :'text-whiteColor text-[16px] leading-7 font-semibold hover:text-primaryColor '}>
                      <div className="flex items-center gap-2">
                        <span><RiLogoutBoxLine /></span>
                        <span>Logout</span>
                      </div>
                  </NavLink>
                ) : (
                  <NavLink to='/login' className={navClass => navClass.isActive 
                    ? 'text-primaryColor text-[16px] leading-7 font-semibold '
                    :'text-whiteColor text-[16px] leading-7 font-semibold hover:text-primaryColor '}>
                      <div className="flex items-center gap-2">
                        <span><RiUser3Fill /></span>
                        <span>Login</span>
                      </div>
                  </NavLink>
                )
              }
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