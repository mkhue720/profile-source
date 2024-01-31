import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BASE_URL } from '../../config.js';

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${BASE_URL}/blogs/${id}`);
                const data = await response.json();
                console.log('Data from API:', data);
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setBlog(data.data);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
                setError('Failed to fetch blog. Please try again later.');
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <>
            <Helmet>
                <title>{blog.title || 'Loading...'} | NMK</title>
                <meta name="description" content="Ngô Minh Khuê" />
            </Helmet>
            <div className='blog-details'>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div key={blog._id}>
                        <h2 className='title__blog'>{blog.title}</h2>
                        {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogDetails;
