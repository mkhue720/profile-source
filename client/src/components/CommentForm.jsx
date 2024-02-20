import React, { useState, useContext } from 'react';
import { authContext } from '../context/AuthContext';

const CommentForm = ({ onAddComment }) => {
    const [comment, setComment] = useState('');
    const { user } = useContext(authContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onAddComment(comment);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
            <div className='flex items-center'>
                <img src={user?.photo} alt="User Avatar" className="mr-4 w-[50px] h-[50px]" />
                <textarea
                    className='w-full box-border mb-[15px] p-2.5 text-black'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment here..."
                />
            </div>
            <button type="submit" className='btn'>Submit</button>
        </form>
    );
};

export default CommentForm;