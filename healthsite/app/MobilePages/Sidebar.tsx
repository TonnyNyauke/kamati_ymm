import Link from 'next/link'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} border rounded-lg bg-green-800`} 
    style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '210px', minHeight: '80vh', 
    transition: 'transform 0.3s ease-out', zIndex: 9999}}>
      <button onClick={onClose} className="absolute text-white top-0 right-1 p-4">
        <FaTimes size={26} />
      </button>
      <div className="p-4  text-white flex flex-col m-1 space-y-6">
        <Link href='/'><i className='fas fa-home'></i> Home</Link>
        <Link href='/Shop'><i className='fas fa-store-alt'></i> Shop</Link>
        <Link href='/cart'><i className='fas fa-shopping-cart'></i> Cart</Link>
        <Link href='/#'><i className='fas fa-user'></i> About us</Link>
        <Link href='/login'><i className='fas fa-sign-in-alt'></i> Sign in</Link>
      </div>
    </div>
  )
}

export default Sidebar