import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config.js';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import { Helmet } from 'react-helmet';
import { Editor } from '@tinymce/tinymce-react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    image: '',
    content: '',
    updateAt: '',
    tags: [],
    newTag: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!blogId) {
          return;
        }

        const response = await fetch(`${BASE_URL}/blogs/${blogId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setBlog(data.data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleInputChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setBlog({ ...blog, image: data.url });
  };
  const handleImageURLChange = (e) => {
    setBlog({ ...blog, image: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTags = blog.tags.filter((tag) => tag.trim() !== '');
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error('Failed to edit blog:', error);
    }
    navigate('/admin/dashboard');
  };
  const handleTagInputChange = (e) => {
    setBlog({ ...blog, newTag: e.target.value });
  };
  const handleAddTag = () => {
    if (blog.newTag.trim() !== '') {
      setBlog({
        ...blog,
        tags: [...blog.tags, blog.newTag.trim()],
        newTag: '',
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = blog.tags.filter((tag) => tag !== tagToRemove);
    setBlog({ ...blog, tags: updatedTags });
  };

  return (
    <>
      <Helmet>
        <title>Edit Blog {blog.title} | NMK</title>
      </Helmet>
    <form onSubmit={handleSubmit} className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
    <label className='form__label' htmlFor="title">Tiêu Đề:</label>
        <input
          className='w-full box-border mb-[15px] p-2.5'
          type="text"
          id="title"
          name="title"
          value={blog.title}
          required
          onChange={handleInputChange}
        />

        <label className='form__label' htmlFor="author">Tác Giả:</label>
        <input
          className='w-full box-border mb-[15px] p-2.5'
          type="text"
          id="author"
          name="author"
          value={blog.author}
          required
          onChange={handleInputChange}
        />

      <label htmlFor="image" className='form__label'>Image:</label>
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
        id="imageUrl"
        name="imageUrl"
        placeholder="Nhập URL ảnh"
        onChange={handleImageURLChange}
      />

      <label htmlFor="content" className='form__label'>Content:</label>
      <Editor
          value={blog.content}
          onEditorChange={(content) => setBlog({ ...blog, content })}
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
          {blog.tags.map((tag, index) => (
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
          value={blog.newTag}
          onChange={handleTagInputChange}
          onKeyPress={(e) => e.key === ',' && handleAddTag()}
          style={{ marginTop: '10px' }}
        />

      <button className='btn' type="submit" value={blog.updateAt}>Save Changes</button>
    </form>
    </>
  );
};

export default EditBlog;