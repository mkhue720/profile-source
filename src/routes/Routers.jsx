import Home from '../pages/Home'
import Blog from '../pages/Blog/Blog'
import BlogDetails from '../pages/Blog/BlogDetails'
import Contact from '../pages/Contact'
import Projects from '../pages/Projects'
import {Routes, Route} from 'react-router-dom'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/blog' element = {<Blog />} />
        <Route path='/blog/:id' element = {<BlogDetails />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/projects' element = {<Projects />} />
    </Routes>
  )
}

export default Routers