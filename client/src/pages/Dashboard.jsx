import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Replace this URL with the URL of your API
    fetch('http://localhost:5173/blog')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | NMK</title>
        <meta name="description" content="Ngô Minh Khuê" />
      </Helmet>
      <h2 className="profile__name font-bold text-center ">Dashboard for Admin</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;