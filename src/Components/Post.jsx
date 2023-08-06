import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {formatISO9075} from "date-fns"
import { Link } from 'react-router-dom';

const Post = () => {
    const [postData, setPostData] = useState([]);
    useEffect(() => {
        async function getPosts() {
            const {data} = await axios.get("https://blog-backend-c7bn.onrender.com/allPosts");
                setPostData(data.posts)
        }
        getPosts();
    }, [])
    return (
        <>
        {postData.map((item) => {
            return (
                <>
        <div className="post">
            <div className="image">
                <Link to={`/post/${item._id}`}>
                <img className='h-[200px]' src={item.image ? item.image : <h2>Loading...</h2>} alt={item.title} />
                </Link>
            </div>
            <div className='texts w-full'>
                <Link to={`/post/${item._id}`}>
                <h2>{item.title}</h2>
                </Link>
                <p className="info">
                    <span className="author">{item.author}</span>
                    <time>{formatISO9075(new Date(item.createdAt))}</time>
                </p>
                <p className='summary'>{item.summary}</p>
            </div>
        </div>  
                </>
            )
        })}
        </>
    )
}

export default Post