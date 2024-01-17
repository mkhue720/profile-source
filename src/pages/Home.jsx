import React from 'react'
import 'boxicons/css/boxicons.min.css';
import avatar from '../assets/img/avatar.png'

import '../App.css'

const Home = () => {
  return (
    <>
    <div className="block w-full opacity-1 transform: translate-y-0">
    <div className="profile__data">      
      <div className="profile__perfil">
        <img src={avatar} alt="" />
      </div>              
      <h2 className="profile__name">
        Ngô Minh Khuê
        <span className="facebook-verified">
          <i className='bx bxs-check-circle' style={{ color: '#0b3ef1' }}></i>
        </span>
      </h2>     
      <h3 className="profile__profession">NMK</h3>         
    </div>
    <div className="introduce flex items-center gap-2">
      <span>
      <i className='bx bxs-map' style={{color:'#0a3dee'}} ></i>
      </span>
      <div className="location">
        <h3>Bac Ninh, Viet Nam</h3>
      </div>
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, porro facere. Quae maiores praesentium temporibus voluptatibus nemo magnam incidunt dolores, ratione reprehenderit similique tenetur expedita corrupti error hic ipsa consequatur blanditiis iusto voluptatem mollitia. Ex aliquam ea deleniti. Non aperiam eveniet enim deleniti laborum placeat ea, voluptate incidunt nobis, distinctio repellat ducimus autem.</h3>
    </div>
    </div>
    </>
  )
}

export default Home