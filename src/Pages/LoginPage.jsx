import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

const LoginPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });
  const Navigate = useNavigate()
  const handleChange = (event) => {
    const {value, name} = event.target;
    setUserData(prevVal => {
      return {
        ...prevVal,
        [name] : value
      }
    })
  }
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const {username, password} = userData;
      const {data} = await axios.post("https://blog-backend-c7bn.onrender.com/login", {
        username: username,
        password: password
      }, {
        withCredentials: true
      });
      console.log(data);
      localStorage.setItem("token", JSON.stringify({token: data.token, name: data.result.username}))
      Navigate("/")
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
        <form onSubmit={loginUser} className='login max-w-[400px] mx-auto'>
            <h1 className='f text-3xl font-bold pb-5 text-center'>Login</h1>
            <input onChange={handleChange} value={userData.username} className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="text" placeholder='username' name="username" id="" />
            <input onChange={handleChange} value={userData.password} className='outline-none block mb-[5px] w-full py-[5px] px-[7px] border border-[#ccc] bg-[#fff]' type="password" placeholder='password' name="password" id="" />
            <button className='w-full block bg-[#555] border-0 rounded py-[7px] text-white'>Login</button>
        </form>
  )
}

export default LoginPage