import React, { useState } from 'react';

const ImgtoLink = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [imgurLink, setImgurLink] = useState("");
  const [copyButtonVisible, setCopyButtonVisible] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImageToImgur(file);
    }
  };

  const uploadImageToImgur = (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID c4ad205083597e6", // Replace with your Client-ID
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setImgSrc(data.data.link);
          setImgurLink(data.data.link);
          setCopyButtonVisible(true);
        } else {
          throw new Error("Lỗi khi tải lên hình ảnh.");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error gracefully, e.g., show an error message to the user
      });
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
