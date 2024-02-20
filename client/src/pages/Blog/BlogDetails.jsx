import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BASE_URL, token } from '../../config.js';
import CommentForm from '../../components/CommentForm.jsx';
import ReplyForm from '../../components/ReplyForm.jsx';
import getComment from '../hooks/userFetchData.jsx';
import { toast } from 'react-toastify';

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { data: comments, error: commentError } = getComment(`${BASE_URL}/comments/${id}`);
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const userId = userData ? userData._id : null;
    const isLoggedIn = userData !== null;
    const [comment, setComment] = useState([]);
    const [replies, setReplies] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(null);

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

    const handleAddComment = async (commentText) => {
        try {
            const res = await fetch(`${BASE_URL}/comments/add/${id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    blogId: id,
                    user: userId,
                    comment: commentText,
                }),
            });
            const result = await res.json();
    
            if (!res.ok) {
                throw new Error(result.message);
            }
            const newComment = {
                ...result.data,
                user: { name: userData.name },
                replies: [], 
            };
            setComment((prevComments) => [...prevComments, newComment]);
    
            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }
    };
    
    const handleAddReply = async (commentId, replyText) => {
        try {
            const res = await fetch(`${BASE_URL}/comments/reply/${commentId}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: userId,
                    text: replyText,
                }),
            });
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }
            const newReply = { 
                user: {name: userData.name}, 
                text: replyText 
            };
            setReplies(prev => [...prev, newReply]);
            // Find the comment to which the reply was added
            const commentIndex = comments.findIndex(comment => comment._id === commentId);
            if (commentIndex !== -1) {
                // Add the new reply to the replies array of the comment
                comments[commentIndex].replies.push(newReply);
                // Update the comments state
                setComment([...comments]);
            }

            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>{blog.title || 'Loading...'} | NMK</title>
                <meta name='description' content={blog.title || 'Loading...'} />
                <meta name='keywords' content={blog.tags} />
            </Helmet>
        </HelmetProvider>
            <div className='blog-details'>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div key={blog._id}>
                        <h2 className='title__blog'>{blog.title}</h2>
                        <div className='pr-8 pl-8' dangerouslySetInnerHTML={{ __html: blog.content }} />
                        <p className='pl-[80%] font-bold text-[20px] '>{blog.author}</p>
                    </div>
                )}
            </div>
            <div className="comment-container">
                <h2 className='text-[20px] font-bold pt-[25px]'>Comment</h2>
                {isLoggedIn && <CommentForm onAddComment={handleAddComment} />}
                
                {commentError ? <p>{commentError}</p> : comments.map((comment) => (
                    <div key={comment._id}>
                        {comment.user && (
                            <div>
                                <p className='pb-[15px]'>{`${comment.user.name}: ${comment.comment}`}</p>
                                {/* Hiển thị form reply chỉ khi người dùng đã đăng nhập */}
                                {isLoggedIn && <button onClick={() => setShowReplyForm(comment._id)} className='text-primaryColor'>Reply</button>}
                                {comment.replies.map((reply, index) => (
                                    <div key={index} className='pl-[50px]'>
                                        {reply.user.name}[reply]: {reply.text}
                                    </div>
                                ))}
                                {isLoggedIn && showReplyForm === comment._id && (
                                    <ReplyForm onAddReply={(replyText) => handleAddReply(comment._id, replyText)} />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>            
        </>
    );
};

export default BlogDetails;
