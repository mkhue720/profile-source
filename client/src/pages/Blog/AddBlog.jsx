import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';
import { Helmet } from 'react-helmet';
import { BASE_URL } from '../../config.js';
import { Link, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    content: '',
    tags: [],
    newTag: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, image: data.url });
  };

  const handleImageURLChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleTagInputChange = (e) => {
    setFormData({ ...formData, newTag: e.target.value });
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() !== '') {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: '',
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = formData.tags.filter((tag) => tag !== tagToRemove);
    setFormData({ ...formData, tags: updatedTags });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const validTags = formData.tags.filter((tag) => tag.trim() !== '');

    try {
      const res = await fetch(`${BASE_URL}/blogs/add`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tags: validTags }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thêm Bài Viết | NMK</title>
        <meta name="keywords" content={formData.tags.join(',')} />
      </Helmet>
      <form className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
      <label className='form__label' htmlFor="title">Tiêu Đề:</label>
        <input
          className='w-full box-border mb-[15px] p-2.5'
          type="text"
          id="title"
          name="title"
          value={formData.title}
          required
          onChange={handleInputChange}
        />

        <label className='form__label' htmlFor="author">Tác Giả:</label>
        <input
          className='w-full box-border mb-[15px] p-2.5'
          type="text"
          id="author"
          name="author"
          value={formData.author}
          required
          onChange={handleInputChange}
        />

        <label className='form__label' htmlFor="image">Chọn Ảnh:</label>
        <input
          className='w-full box-border mb-[15px] p-2.5'
          type="file"
          id="image"
          name="image"
          accept='.jpg, .png,'
          onChange={handleFileChange}
        />

        <label className='form__label' htmlFor="image">Ảnh từ URL:</label>
        <input
          className='w-full box-border mb-[15px] p-2.5'
          type="text"
          id="image"
          name="image"
          placeholder="Nhập URL ảnh"
          onChange={handleImageURLChange}
        />

        <label className='form__label' htmlFor="content">Nội Dung:</label>
        <Editor
          value={formData.content}
          onEditorChange={(content) => setFormData({ ...formData, content })}
          apiKey='kme8f0v2vs9g6fonck3h0yudeqco5otv63i80yzmu0iuulls'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}
        />
        <label className='form__label' htmlFor="tags">Tags:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {formData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
              style={{ margin: '4px' }}
            />
          ))}
        </div>

        <TextField
          className='w-full box-border mb-[15px] p-2.5 bg-white'
          label="Thêm tags mới"
          variant="outlined"
          value={formData.newTag}
          onChange={handleTagInputChange}
          onKeyPress={(e) => e.key === ',' && handleAddTag()}
          style={{ marginTop: '10px' }}
        />

        <button className='btn' type="button" onClick={submitHandler}>
          {loading ? <HashLoader size={25} color='#fff' /> : 'Đăng Bài'}
        </button>
      </form>
    </>
  );
};

export default AddBlog;