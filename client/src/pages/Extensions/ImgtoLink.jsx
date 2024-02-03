import React, { useState } from 'react';

const ImgtoLink = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [imgurLink, setImgurLink] = useState("");
  const [copyButtonVisible, setCopyButtonVisible] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const link = await uploadImageToImgur(file);
        setImgSrc(link);
        setImgurLink(link);
        setCopyButtonVisible(true);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Xử lý lỗi một cách graceful, ví dụ: hiển thị một thông báo lỗi cho người dùng
      }
    }
  };

  const uploadImageToImgur = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID c4ad205083597e6", // Thay thế bằng Client-ID của bạn
      },
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.link;
    } else {
      throw new Error("Lỗi khi tải lên hình ảnh.");
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(imgurLink);
    alert("Liên kết đã được sao chép vào clipboard!");
  };

  return (
    <>
      <div>
        <div className="image-container text-center">
          <img src={imgSrc || 'https://i.imgur.com/U7afLiO.png'} alt="Uploaded Image" className='max-w-full mx-auto' />
        </div>
        <div className="upload-section text-center mt-5">
          <label htmlFor="file" className="custom-file-upload bg-[#3498db] text-white cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] inline-block px-5 py-2.5 rounded-[5px] hover:bg-[#2980b9]">
            <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <input type="text" id="image-link" value={imgurLink} className='w-full border bg-[#f9f9f9] mt-2.5 p-2.5 rounded-[5px] border-solid border-[#ccc]' readOnly />
          {copyButtonVisible && <button className='btn' onClick={copyLinkToClipboard}>Copy Link ảnh</button>}
        </div>
      </div>
    </>
  );
};

export default ImgtoLink;
