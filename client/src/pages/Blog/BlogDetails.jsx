import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const API_KEY = 'AIzaSyDnKFgVf_UBcUIzXO7ccle0fDfVEka8PU0';

    useEffect(() => {
        fetch(`https://www.googleapis.com/blogger/v3/blogs/2995102736555091421/posts/${id}?key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const formattedData = {
                    id: data.id,
                    title: data.title,
                    imageUrl: data.images && data.images[0] ? data.images[0].url : null,
                    content: data.content,
                };

                setBlog(formattedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Helmet>
            <title>{blog.title} | NMK</title>
            <meta name="description" content="Ngô Minh Khuê" />
        </Helmet>
        <div className='blog-details'>
            <h2 className='title__blog'>{blog.title}</h2>
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        </>
    );
};

export default BlogDetails;