import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const CreatePost = () => {
    const [postData, setPostData] = useState({
        title: "",
        summary: ""
    });
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const Navigate = useNavigate();
    useEffect(() => {
        if (url) {
            async function createPost() {
                const {data} = await axios.post("https://blog-backend-c7bn.onrender.com/createpost", {
                    title: postData.title,
                    summary: postData.summary,
                    content: content,
                    image: url
                }, {
                    withCredentials: true
                });
                console.log(data);
                Navigate("/");
            }
            createPost();
        }
    }, [url])
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPostData(prevVal => {
            return {
                ...prevVal,
                [name] : value
            }
        })
    }
    const createPost = async (event) => {
        event.preventDefault();
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    const handleFile = (event) => {
        const file = event.target.files[0];
        setImage(file);
    }
    const uploadPost = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "blog-website");
        const {data} = await axios.post("https://api.cloudinary.com/v1_1/mgk/image/upload", formData);
        setUrl(data.url)
    }
  return (
    <form onSubmit={createPost} className='max-w-[500px] mx-auto'>
        <input 
        onChange={handleChange} 
        value={postData.title} 
        className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="text" 
        placeholder='Title' 
        name="title" id="" />
        <input 
        onChange={handleChange} 
        value={postData.summary} 
        className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="text" 
        placeholder='Summary' 
        name="summary" id="" />
        <input 
        onChange={handleFile}
        className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="file" id="" />
       <ReactQuill 
       value={content} 
       onChange={newValue => setContent(newValue)}
       modules={modules} 
       formats={formats}/>
       <button className='w-full block bg-[#555] border-0 rounded py-[7px] text-white mt-2' onClick={uploadPost}>Create Post</button>
    </form>
  )
}

export default CreatePost