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
      
    </div>
    <div>
    <div className="introduce flex items-center gap-2">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <i className='bx bxs-map' style={{color:'#0a3dee'}} ></i>
          </span>
          <div className="location">
            <h3>Bac Ninh, Viet Nam</h3>
          </div>
        </div>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, porro facere. Quae maiores praesentium temporibus voluptatibus nemo magnam incidunt dolores, ratione reprehenderit similique tenetur expedita corrupti error hic ipsa consequatur blanditiis iusto voluptatem mollitia. Ex aliquam ea deleniti. Non aperiam eveniet enim deleniti laborum placeat ea, voluptate incidunt nobis, distinctio repellat ducimus autem.</h3>
      </div>
      <div className="divider"></div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '32px' }}>Skills</h1>
      <div className="skills-container flex">
        <div className="skills flex items-center gap-2">
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>FrontEnd</h1>
          <div className="skills__group grid grid-cols-2 gap-6">
            <div className="skills__data">
            <i className="bx bxl-html5 bx-tada" style={{ color: "#f06d06" }} />
              <div>
                <h3 className="skills__name">HTML</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-css3 bx-tada" style={{ color: "#0628f0" }} />
              <div>
                <h3 className="skills__name">CSS</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-javascript bx-tada" style={{ color: "#f0d606" }} />
            <div>
                <h3 className="skills__name">JavaScript</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-react bx-tada" style={{ color: "#06d6f0" }} />
              <div>
                <h3 className="skills__name">React</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-bootstrap bx-tada" style={{ color: "#9606f0" }} />
              <div>
                <h3 className="skills__name">Bootstrap</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-tailwind-css bx-tada" style={{ color: "#06d6f0" }} />
              <div>
                <h3 className="skills__name">Tailwind</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="skills flex items-center gap-2">
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>BackEnd</h1>
          <div className="skills__group grid grid-cols-2 gap-6">
            <div className="skills__data">
            <i className="bx bxl-nodejs bx-tada" style={{ color: "#028901" }} />
              <div>
                <h3 className="skills__name">NodeJs</h3>
              </div>
            </div>
            <div className="skills__data">
              <i className="ri-checkbox-circle-line"></i>
              <div>
                <h3 className="skills__name">ExpressJs</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-mongodb bx-tada" style={{ color: "#0aff02" }} />
              <div>
                <h3 className="skills__name">MongoDB</h3>
              </div>
            </div>
            <div className="skills__data">
              <i className="ri-checkbox-circle-line"></i>
              <div>
                <h3 className="skills__name">My SQL</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-firebase bx-tada" style={{ color: "#ff9702" }} />
              <div>
                <h3 className="skills__name">Firebase</h3>
              </div>
            </div>
            <div className="skills__data">
            <i className="bx bxl-php bx-tada" />
              <div>
                <h3 className="skills__name">PHP</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
    </>
  )
}

export default Home