import React, { useState, useContext } from 'react';
import { authContext } from '../context/AuthContext';

const ReplyForm = ({ onAddReply }) => {
    const [replyText, setReplyText] = useState('');
    const { user } = useContext(authContext);
    const handleInputChange = (event) => {
        setReplyText(event.target.value);
    };

    const handleAddReply = () => {
        if (replyText.trim() === '') {
            // Kiểm tra xem nội dung reply có trống không
            // Có thể thêm thông báo lỗi hoặc bất kỳ xử lý nào bạn muốn ở đây
            return;
        }

        // Gọi hàm callback để thêm reply
        onAddReply(replyText);

        // Reset nội dung của reply form sau khi thêm reply
        setReplyText('');
    };

    return (
        // <div className="reply-form">
        //     <textarea
        //         placeholder="Reply here..."
        //         value={replyText}
        //         onChange={handleInputChange}
        //     />
        //     <button onClick={handleAddReply}>Submit</button>
        // </div>
        <form onSubmit={handleAddReply} className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
            <div className='flex items-center'>
                <img src={user?.photo} alt="User Avatar" className="mr-4 w-[50px] h-[50px]" />
                <textarea
                    className='w-full box-border mb-[15px] p-2.5 text-black'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Rely here..."
                />
            </div>
            <button type="submit" className='bg-primaryColor py-[10px] px-[15px] text-white font-[600] mt-[38px]; '>Submit</button>
        </form>
    );
};

export default ReplyForm;
