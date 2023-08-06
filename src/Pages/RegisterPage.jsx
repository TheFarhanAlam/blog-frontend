import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });
  const Navigate = useNavigate();
  const handleChange = (event) => {
    const {value, name} = event.target;
    setUserData(prevVal => {
      return {
        ...prevVal,
        [name] : value
      }
    })
  }
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const {username, password} = userData;
      const {data} = await axios.post("https://blog-backend-c7bn.onrender.com/register", {
        username: username,
        password: password
      });
      Navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className='register max-w-[400px] mx-auto'>
            <h1 className='f text-3xl font-bold pb-5 text-center'>Register</h1>
            <input onChange={handleChange} value={userData.username} className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="text" placeholder='username' name="username" id="" />
            <input onChange={handleChange} value={userData.password} className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="password" placeholder='password' name="password" id="" />
            <button className='w-full block bg-[#555] border-0 rounded py-[7px] text-white' onClick={registerUser}>Register</button>
        </form>
  )
}

export default RegisterPage