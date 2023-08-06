import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Header = () => { 
    const token = JSON.parse(localStorage.getItem("token"))
    const logout = async () => {
        localStorage.clear();
        window.location.reload(false);
    }
    
    return (
        <header className='flex justify-between mb-[50px] items-center mt-5'>
            <Link className='no-underline text-[#222] font-bold text-[1.5rem]' to="/">MyBlog</Link>
            <nav className='flex gap-[15px]'>
                {token && (
                    <>
                    <Link to={"/create"}>Create new post</Link>
                    <Link onClick={logout}>Logout</Link>
                    </>
                )}
                {
                    !token && (
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Header