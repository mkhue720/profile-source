import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import 'boxicons/css/boxicons.min.css';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (blogId) => {
    navigate(`/admin/editblog/${blogId}`);
  };

  const handleDeleteClick = async (blogId) => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog.');
      }

      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setBlogs(data.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setError('Failed to fetch blogs. Please try again later.');
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | NMK</title>
      </Helmet>
      <h2 className="profile__name font-bold text-center">Dashboard for Admin</h2>
      <div className="profile__container mt-10">
        <Link to="/admin/addblog" className="btn ml-[50px]">
          Add Blog
        </Link>
      </div>
      <div className='repo-container mt-10 mr-auto'>
        {error ? (
          <p>{error}</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="introduce flex items-center gap-2">
              <h3>Title: {blog.title}</h3>
              <p>Author: {blog.author}</p>
              {blog.image && <img src={blog.image} alt={blog.title} className='w-[100px] h-[100px]' />}
              <span>
                <i className='bx bx-edit-alt mr-10' onClick={() => handleEditClick(blog._id)}>Edit</i>
                <i className='bx bxs-trash mr-10' onClick={() => handleDeleteClick(blog._id)}>Delete</i>
              </span>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
