import Link from 'next/link'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Categories({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'} border rounded-lg bg-green-800`} 
    style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '210px', minHeight: '80vh', 
    transition: 'transform 0.3s ease-out', zIndex: 9999}}>
      <button onClick={onClose} className="absolute text-white top-0 right-1 p-4">
        <FaTimes size={26} />
      </button>
      <div className="p-4  text-white flex flex-col m-1 space-y-6">
        
      </div>
    </div>
  )
}

export default Categories;