import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

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

const EditPost = () => {
    const [postData, setPostData] = useState({
        title: "",
        summary: ""
    });
    const [editData, setEditData] = useState({})
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const Navigate = useNavigate();
    const params = useParams();
    // useEffect(() => {
    //     if (url) {
    //         async function createPost() {
    //             const {data} = await axios.post(`http://localhost:8000/edit/${params.id}`, {
    //                 title: postData.title,
    //                 summary: postData.summary,
    //                 content: content,
    //                 image: url
    //             }, {
    //                 withCredentials: true
    //             });
    //             console.log(data);
    //             Navigate("/");
    //         }
    //         createPost();
    //     }
    // }, [url])
    useEffect(() => {
        async function getInfo() {
            try {
                const {data} = await axios.get(`https://blog-backend-c7bn.onrender.com/post/${params.id}`);
                const title = data.result.title;
                const summary = data.result.summary;
                const content = data.result.content;
                console.log(title, summary);
                if (data) {
                    setPostData({title: title, summary: summary, content: content})
                }
            } catch (error) {
                console.log(error);
            }
        }
        getInfo();
    }, [])
    
    
    const handleChange = (event) => { 
        const {name, value} = event.target;
        setPostData(prevVal => {
            return {
                ...prevVal,
                [name] : value
            }
        })
    }
    const editPost = async  (event) => {
        event.preventDefault();
        try {
            const {title,summary, content} = postData;
            const response = await axios.put(`http://localhost:8000/edit/${params.id}`, {
                title,
                summary,
                content
            });
            console.log(response.data.updatedPost);
            Navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <form className='max-w-[500px] mx-auto'>
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
   <ReactQuill 
   value={postData.content} 
   onChange={newValue => setContent(newValue)}
   modules={modules} 
   formats={formats}/>
   <button className='w-full block bg-[#555] border-0 rounded py-[7px] text-white mt-2' onClick={editPost}>Edit Post</button>
</form>
  )
}

export default EditPost