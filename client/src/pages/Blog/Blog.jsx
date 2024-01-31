import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config.js';
import 'boxicons/css/boxicons.min.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
      <div className='repo-container mt-10 mr-auto'>
        {error ? (
          <p>{error}</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="introduce flex items-center gap-2">
              <Link to={`/blog/${blog._id}`}>
                <h3>Title: {blog.title}</h3>
                <p>Author: {blog.author}</p>
                {blog.image && <img src={blog.image} alt={blog.title} className='w-[100px] h-[100px]' />}
              </Link>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </>
  );
};

export default Blog;
