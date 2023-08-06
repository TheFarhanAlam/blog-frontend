import React, { useEffect } from 'react'
import Post from "../Components/Post"

const IndexPage = () => {
  const token = JSON.stringify(localStorage.getItem("token"))
  return (
    <>
    <Post />
    </>
  )
}

export default IndexPage