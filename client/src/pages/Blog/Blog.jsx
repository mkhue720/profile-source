import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = 'AIzaSyDnKFgVf_UBcUIzXO7ccle0fDfVEka8PU0';
        const BLOG_ID = '2995102736555091421';

        const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`);
        const data = await response.json();

        const formattedData = data.items.map(blog => ({
          id: blog.id,
          title: blog.title,
          imageUrl: blog.images && blog.images[0] ? blog.images[0].url : null,
          url: `/blog/${blog.id}`,
        }));

        setBlogs(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>Blog | NMK</title>
        <meta name="description" content="Ngô Minh Khuê" />
      </Helmet>
      <div className='repo-container'>
        {blogs.map(blog => (
          <div key={blog.id} className="introduce flex items-center gap-2">
            <a href={blog.url}>
              <h2>{blog.title}</h2>
            </a>
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
