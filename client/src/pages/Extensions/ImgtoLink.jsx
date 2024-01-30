import React, { useState } from 'react';
import axios from 'axios';

const ImgtoLink = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgurLink, setImgurLink] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      uploadImageToImgur(selectedImage);
    }
  };

  const uploadImageToImgur = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const clientID = "c4ad205083597e6"; // Thay YOUR_CLIENT_ID bằng client ID của bạn từ Imgur

    axios.post('https://api.imgur.com/3/upload', formData, {
      headers: {
        'Authorization': `Client-ID ${clientID}`,
      },
    })
    .then(response => {
      setImgurLink(response.data.data.link);
      console.log('Upload successful. Imgur link:', response.data.data.link);
    })
    .catch(error => {
      console.error('Error uploading image to Imgur:', error.response.data);
    });
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(imgurLink);
    alert('Link copied to clipboard!');
  };

  return (
    <>
    <div>
      <div className="image-container text-center">
        <img src={imgurLink || 'https://i.imgur.com/U7afLiO.png'} alt="Uploaded Image" className='max-w-full mx-auto' />
      </div>
      <div className="upload-section text-center mt-5">
        <label htmlFor="file" className="custom-file-upload bg-[#3498db] text-white cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] inline-block px-5 py-2.5 rounded-[5px] hover:bg-[#2980b9]">
          <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <input type="text" id="image-link" value={imgurLink} className='w-full border bg-[#f9f9f9] mt-2.5 p-2.5 rounded-[5px] border-solid border-[#ccc];' readOnly />
        <button className='btn' onClick={handleUpload}>Upload Image</button>
        <button className='btn' onClick={copyLinkToClipboard}>Copy Link ảnh</button>
      </div>
    </div>
    </>
  );
};

export default ImgtoLink;
