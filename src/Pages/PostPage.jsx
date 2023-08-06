import axios from 'axios';
import { formatISO9075 } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = () => {
    const [postData, setPostData] = useState({});
    const params = useParams();
    useEffect(() => {
        async function post() {
            console.log(params.id);
            const {data} = await axios.get(`https://blog-backend-c7bn.onrender.com/post/${params.id}`);
            setPostData(data.result);
            if (data) {
                console.log(postData);
            }
        }
        post();
    }, []);

    if (!postData) {
        return null
    }
    const name = {...localStorage};
    const newName = JSON.parse(name.token);
    const nextName = newName.name;
    console.log(nextName);
  return (
    <>
    <div className=''>
        <h1 className='text-center font-bold text-[1.8rem] pb-2'>{postData.title}</h1>
        {/* <time>{formatISO9075(new Date(postData.createdAt))}</time> */}
        <div className="author text-center mb-5 text-[.7rem] font-bold">by {postData.author}</div>
        {postData.author === nextName ? <>
        <Link to={`/edit/${postData._id}`} className='bg-[#333] text-white p-[15px]'><button className="mx-[40%]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 relative top-6 right-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post</button>
        </Link></> : null }
        <div className="image max-h-auto mt-4 mb-3 flex overflow-hidden">
        <img className='object-cover' style={{objectPosition: "center center"}} src={postData.image} alt="" />
        </div>
        <div className='leading-5' dangerouslySetInnerHTML={{__html: postData.content}}></div>
    </div>
    </>
  )
}

export default PostPage