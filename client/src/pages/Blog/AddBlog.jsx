import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Helmet } from 'react-helmet';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const createPost = () => {
    alert(`Bài Đăng Mới:\nTitle: ${title}\nTác Giả: ${author}\nẢnh: ${image}\nNội Dung: ${content}`);
  };

  return (
    <>
    <Helmet>
      <title>Add Blog | NMK</title>
    </Helmet>
    <form className='w-[90%] mx-auto my-5 p-5 rounded-[5px]'>
      <label className='form__label' htmlFor="title">Title:</label>
      <input className='w-full box-border mb-[15px] p-2.5' type="text" id="title" name="title"  required onChange={e => setTitle(e.target.value)} />

      <label className='form__label' htmlFor="author">Tác Giả:</label>
      <input className='w-full box-border mb-[15px] p-2.5' type="text" id="author" name="author" required onChange={e => setAuthor(e.target.value)} />

      <label className='form__label' htmlFor="image">Chọn Ảnh:</label>
      <input className='w-full box-border mb-[15px] p-2.5' type="file" id="image" name="image" accept="image/*" onChange={e => setImage(e.target.value)} />

      <label className='form__label' htmlFor="content">Nội Dung:</label>
      <Editor
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

      <button className='btn' type="button" onClick={createPost}>Tạo Bài Đăng</button>
    </form>
    </>
  );
}

export default AddBlog;