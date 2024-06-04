import React from 'react';
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navigation() {
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gray-100 shadow-md flex justify-between items-center p-2 space-x-4 rounded-t-md
    m-4 mb-2'> {/* Mobile-first styles */}
      <Link href='/homepage' className='text-gray-700 hover:text-blue-500'>
      <i className="fas fa-home"></i>
      </Link>
      <Link href='homepage/cart' className='text-gray-700 hover:text-blue-500'>
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <Link href='/mealplans' className='text-gray-700 hover:text-blue-500'>
        <i className="fas fa-utensils"></i>
      </Link>
      <Link href='/healthplans' className='text-gray-700 hover:text-blue-500'>
        <i className="fas fa-heartbeat"></i>
      </Link>
      <button><i className="fas fa-sign-out"></i></button>
    </div>
  );
}

export default Navigation;
