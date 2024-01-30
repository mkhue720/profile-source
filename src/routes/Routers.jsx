import Home from '../pages/Home'
import Blog from '../pages/Blog/Blog'
import BlogDetails from '../pages/Blog/BlogDetails'
import Contact from '../pages/Contact'
import Projects from '../pages/Projects'
import {Routes, Route} from 'react-router-dom'
import Extensions from '../pages/Extensions/Extensions'
import Weather from '../pages/Extensions/Weather'
import Calendar from '../pages/Extensions/Calendar'
import Translator from '../pages/Extensions/Translator'
//import ImgToLink from '../pages/Extensions/ImgToLink'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/blog' element = {<Blog />} />
        <Route path='/blog/:id' element = {<BlogDetails />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/projects' element = {<Projects />} />
        <Route path='/extensions' element = {<Extensions />} />
        <Route path='/extensions/weather' element = {<Weather />} />
        <Route path='/extensions/calendar' element = {<Calendar />} />
        <Route path='/extensions/translator' element = {<Translator />} />
{/*         <Route path='/extensions/imgtolink' element = {<ImgToLink />} /> */}
    </Routes>
  )
}

export default Routers
