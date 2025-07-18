import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

export default function Layout({children}) {
  return (
   <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      {/* This grows to fill remaining space */}
      <div className="flex-grow">
        {children}
      </div>

      <Footer />
    </div>
  )
}
