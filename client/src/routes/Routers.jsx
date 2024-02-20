import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContextProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/Blog/BlogDetails';
import Contact from '../pages/Contact';
import Projects from '../pages/Projects';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Admin/Dashboard';
import AddBlog from '../pages/Blog/AddBlog';
import EditBlog from '../pages/Blog/EditBlog';
import NotFound from '../pages/NotFound';
import User from '../pages/Admin/User';
import Profile from '../pages/User/Profile';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ChatBot from '../pages/ChatBot';

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
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
        <Route path='/chatbot' element={<ChatBot />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/profile/" element={<Profile />} />
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
