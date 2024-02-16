import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function Sidebar({isOpen, onClose}) {
  return (
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>
           
      <button className='close-btn' onClick={onClose}>
        <i className="fas fa-times"></i> {/* Close icon (X) */}
      </button>
      <nav className='sidebar-small-screens'>
        <Link to='/BookAppointment'>
          <i className='fas fa-book'></i>
          Book Appointment</Link>
        <Link to='/Shop'>
          <i className='fas fa-shopping-cart'></i>
          Shop</Link>
        <Link to='/MealPlanner'>
          <i className='fas fa-apple-alt'></i>
          Meal Planner</Link>
        <Link to='/Newstart'>
          <i className='fas fa-star'></i>
          NEWSTART</Link>
        <Link to='/Sanitarium'>
          <i className='fas fa-hospital'></i>
          Sanitarium</Link>
        <Link to='/DownloadApp'>
          <i className='fas fa-download'></i>
          Download our App</Link>
        <Link to='/AboutUs'>
          <i className='fas fa-info-circle'></i>
          About Us</Link>
      </nav>
    </div>
  )
}

export default Sidebar