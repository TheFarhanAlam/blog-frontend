import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='p-[10px] max-w-[600px] mx-auto'>
        <Header />
        <Outlet />
    </main>
  )
}

export default Layout