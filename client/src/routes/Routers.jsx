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
import ImgToLink from '../pages/Extensions/ImgtoLink';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Admin/Dashboard';
import AddBlog from '../pages/Blog/AddBlog';
import EditBlog from '../pages/Blog/EditBlog';
import NotFound from '../pages/NotFound';
import User from '../pages/Admin/User';

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
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
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
        <Route path="/admin/editblog/:blogId" element={
          <PrivateRoute allowedRoles={['admin']} >
            <EditBlog />
          </PrivateRoute>
        } />
        <Route path="/admin/dashboard/:blogId" element={
          <PrivateRoute allowedRoles={['admin']} >
            <Dashboard />
          </PrivateRoute>
        } />
      <Route path="/admin/users" element={
          <PrivateRoute allowedRoles={['admin']} >
            <User />
          </PrivateRoute>
        } />
      </Routes>
      </AuthContextProvider>
  )
}

export default Routers;
