import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className='homepage'>
      <nav>
        <Link to="Logout">Logout</Link>
      </nav>
      <div className='links'>
        <Link to="/NewslettersPage">Newsletters</Link>
        <Link to="/Appointment">Appointments</Link>
        <Link to="/Shop">Shop</Link>
        <Link to="/MealPlanner">Meal Planner</Link>
        <Link to="/Newstart">Newstart</Link>
        <Link to="/Sanitarium">Sanitarium</Link>
        <Link to="/AppCenter">App Center</Link>
        <Link to="/AnalyticsPage">Analytics</Link>
      </div>
    </div>
  )
}

export default HomePage