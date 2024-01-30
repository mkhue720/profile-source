import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import { AuthContextProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/Blog/BlogDetails';
import Contact from '../pages/Contact';
import Projects from '../pages/Projects';
import Extensions from '../pages/Extensions/Extensions';
import Weather from '../pages/Extensions/Weather';
import Calendar from '../pages/Extensions/Calendar';
import Translator from '../pages/Extensions/Translator';
import ImgToLink from '../pages/Extensions/ImgToLink';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AddBlog from '../pages/Blog/AddBlog';

const Routers = () => {
  return (
      <AuthContextProvider>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/extensions' element={<Extensions />} />
        <Route path='/extensions/weather' element={<Weather />} />
        <Route path='/extensions/calendar' element={<Calendar />} />
        <Route path='/extensions/translator' element={<Translator />} />
        <Route path='/extensions/imgtolink' element={<ImgToLink />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={['admin']} >
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/addblog" element={
          <PrivateRoute allowedRoles={['admin']} >
            <AddBlog />
          </PrivateRoute>
        } />
      </Routes>
      </AuthContextProvider>
  )
}

export default Routers;
