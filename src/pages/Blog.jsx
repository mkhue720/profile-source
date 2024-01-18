import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const API_KEY = 'AIzaSyDnKFgVf_UBcUIzXO7ccle0fDfVEka8PU0';
  const BLOG_ID = '2995102736555091421';

  useEffect(() => {
    fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.items.map(blog => ({
          id: blog.id,
          title: blog.title,
          imageUrl: blog.images && blog.images[0] ? blog.images[0].url : null,
          url: blog.url,
        }));
        console.log(data.items)

        setBlogs(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
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
  );
};

export default Blog;