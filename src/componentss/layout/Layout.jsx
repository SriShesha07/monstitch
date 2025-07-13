import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export default function Layout({children}) {
  return (
    <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="main-component min-h-screen">
            {children}
        </div>
        <Footer />
    </div>
  )
}
