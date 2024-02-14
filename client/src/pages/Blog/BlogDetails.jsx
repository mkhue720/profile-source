import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setBlog(data.data);
            } catch (error) {
                setError('Failed to fetch blog. Please try again later.');
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>{blog.title || 'Loading...'} | NMK</title>
                <meta name="description" content="Ngô Minh Khuê" />
            </Helmet>
        </HelmetProvider>
            <div className='blog-details'>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div key={blog._id}>
                        <h2 className='title__blog'>{blog.title}</h2>
                        {/* {blog.image && <img src={blog.image} alt={blog.title} />} */}
                        <div className='pr-8 pl-8' dangerouslySetInnerHTML={{ __html: blog.content }} />
                        <p className='pl-[80%] font-bold text-[20px] '>{blog.author}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogDetails;
