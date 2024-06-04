import Link from 'next/link'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} `} 
    style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '250px', height: '100vh', 
    transition: 'transform 0.3s ease-out', zIndex: 2}}>
      <button onClick={onClose} className="absolute top-0 right-0 p-2">
        <FaTimes size={20} />
      </button>
      <div className="p-4 bg-gray-800 text-white flex flex-col">
        <Link href='#'>Home</Link>
        <Link href='/Shop'>Shop</Link>
        <Link href='/cart'>Cart</Link>
        <Link href='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Sidebar