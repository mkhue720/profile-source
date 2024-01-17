import Home from '../pages/Home'
import Blog from '../pages/Blog'
import Contact from '../pages/Contact'
import Projects from '../pages/Projects'
import {Routes, Route} from 'react-router-dom'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/blog' element = {<Blog />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/projects' element = {<Projects />} />
    </Routes>
  )
}

export default Routers