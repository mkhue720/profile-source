import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config.js';
import 'boxicons/css/boxicons.min.css';
import HashLoader from 'react-spinners/HashLoader.js'

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

    fetchBlogs()
    .finally(() => {
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center align-middle h-[100vh] loading-spinner">
        <HashLoader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
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
                <div className="flex items-center">
                {blog.image && <img src={blog.image} alt={blog.title} className='w-[100px] h-[100px] mr-[30px]' />}
                <h3 className='text-[20px] font-bold'>{blog.title}</h3>
                </div>
                <span className='pl-[80%]'>{blog.author}</span>
              </Link>
            </div>
          ))
        ) : (
          <p>Không có blog nào.</p>
        )}
      </div>
    </>
  );
};

export default Blog;
