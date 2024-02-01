import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config.js';
import uploadImageToCloudinary from '../../untils/uploadCloudinary.js';
import { Helmet } from 'react-helmet';
import { Editor } from '@tinymce/tinymce-react';

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    image: '',
    content: '',
    updateAt: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <>
      <Helmet>
        <title>Edit Blog {blog.title} | NMK</title>
      </Helmet>
    <form onSubmit={handleSubmit} className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
      <label htmlFor="title" className='form__label' >Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={blog.title}
        onChange={handleInputChange}
      />

      <label htmlFor="author" className='form__label'>Author:</label>
      <input
        className='w-full box-border mb-[15px] p-2.5'
        type="text"
        id="author"
        name="author"
        value={blog.author}
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

      <button className='btn' type="submit" value={blog.updateAt}>Save Changes</button>
    </form>
    </>
  );
};

export default EditBlog;